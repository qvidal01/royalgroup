-- Royal Group Demo Database Initialization
-- Creates databases for all services

-- Create n8n database
CREATE DATABASE IF NOT EXISTS n8n;

-- Create grants
GRANT ALL PRIVILEGES ON DATABASE royalgroup TO royalgroup;
GRANT ALL PRIVILEGES ON DATABASE n8n TO royalgroup;

-- Create tables for demo website
\c royalgroup;

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(12,2),
    bedrooms INTEGER,
    bathrooms DECIMAL(3,1),
    sqft INTEGER,
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(50),
    zip VARCHAR(20),
    property_type VARCHAR(50),
    status VARCHAR(50) DEFAULT 'active',
    featured BOOLEAN DEFAULT false,
    images JSONB,
    features JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Agents table
CREATE TABLE IF NOT EXISTS agents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    title VARCHAR(100),
    bio TEXT,
    image_url VARCHAR(500),
    specialties JSONB,
    social_links JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT,
    property_interest INTEGER REFERENCES properties(id),
    agent_id INTEGER REFERENCES agents(id),
    source VARCHAR(100),
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    client_title VARCHAR(100),
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    image_url VARCHAR(500),
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample agent (Jennifer)
INSERT INTO agents (name, email, phone, title, bio, image_url, specialties) VALUES
('Jennifer Royal', 'jennifer@royalgroup-ev.com', '(555) 123-4567', 'Broker/Owner',
 'With over 15 years of experience in luxury real estate, Jennifer brings unparalleled expertise to every transaction. Her dedication to client satisfaction and deep knowledge of the local market make her the trusted choice for discerning buyers and sellers.',
 '/images/agents/jennifer.jpg',
 '["Luxury Homes", "Waterfront Properties", "Investment Properties", "New Construction"]'::jsonb
);

-- Insert sample properties
INSERT INTO properties (title, slug, description, price, bedrooms, bathrooms, sqft, address, city, state, zip, property_type, featured, images, features) VALUES
('Lakefront Estate with Private Dock', 'lakefront-estate-private-dock',
 'Stunning waterfront property featuring panoramic lake views, private dock, and resort-style amenities. This architectural masterpiece combines modern luxury with natural beauty.',
 2450000, 5, 4.5, 6500, '1234 Lakeshore Drive', 'Evansville', 'IN', '47714', 'Single Family', true,
 '["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200"]'::jsonb,
 '["Private Dock", "Infinity Pool", "Smart Home", "Wine Cellar", "Home Theater", "3-Car Garage"]'::jsonb
),
('Modern Downtown Penthouse', 'modern-downtown-penthouse',
 'Breathtaking city views from this ultra-modern penthouse in the heart of downtown. Floor-to-ceiling windows, designer finishes, and exclusive rooftop access.',
 1850000, 3, 3.0, 4200, '500 Main Street, PH1', 'Evansville', 'IN', '47708', 'Condo', true,
 '["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200"]'::jsonb,
 '["Rooftop Terrace", "Concierge Service", "Private Elevator", "Smart Home", "2 Parking Spaces"]'::jsonb
),
('Historic Victorian Mansion', 'historic-victorian-mansion',
 'Meticulously restored Victorian masterpiece featuring original architectural details, modern amenities, and stunning gardens. A true piece of local history.',
 1650000, 6, 5.0, 7800, '789 Heritage Lane', 'Newburgh', 'IN', '47630', 'Single Family', true,
 '["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"]'::jsonb,
 '["Original Woodwork", "Formal Gardens", "Carriage House", "Wine Cellar", "Library"]'::jsonb
),
('Contemporary Hillside Retreat', 'contemporary-hillside-retreat',
 'Award-winning contemporary design nestled into a private hillside lot. Walls of glass bring the outdoors in while maintaining complete privacy.',
 1250000, 4, 3.5, 4800, '321 Ridge View Court', 'Evansville', 'IN', '47712', 'Single Family', false,
 '["https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200"]'::jsonb,
 '["Infinity Edge Pool", "Outdoor Kitchen", "Home Office", "4-Car Garage", "EV Charging"]'::jsonb
);

-- Insert sample testimonials
INSERT INTO testimonials (client_name, client_title, content, rating, featured) VALUES
('Michael & Sarah Thompson', 'Purchased in Henderson County',
 'Jennifer made our dream home a reality. Her expertise in the luxury market and attention to detail throughout the entire process was exceptional. We could not have asked for a better advocate.',
 5, true
),
('David Chen', 'Sold in Evansville',
 'After interviewing several agents, we chose Jennifer and it was the best decision we made. She sold our home above asking price in just two weeks. Her marketing strategy was brilliant.',
 5, true
),
('The Richardson Family', 'Relocated from Chicago',
 'Relocating from out of state seemed daunting until we found Jennifer. She took the time to understand exactly what we were looking for and made the transition seamless. Highly recommend!',
 5, true
);

-- Create indexes for performance
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_featured ON properties(featured);
CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads(created_at);
