/*
DROP DATABASE IF EXISTS atelier;

CREATE DATABASE atelier;

\c atelier;
*/

DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS related;
DROP TABLE IF EXISTS features;
DROP TABLE IF EXISTS styles CASCADE;
DROP TABLE IF EXISTS skus;
DROP TABLE IF EXISTS photos;

CREATE TABLE product(
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(200),
  slogan VARCHAR(200),
  description TEXT,
  category VARCHAR(50),
  default_price INTEGER
);

CREATE TABLE related(
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  current_product_id INTEGER REFERENCES product(id),
  related_product_id INTEGER REFERENCES product(id)
);

CREATE TABLE features(
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_id INTEGER REFERENCES product(id),
  feature VARCHAR(50),
  value VARCHAR(50)
);

CREATE TABLE styles(
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  productId INTEGER REFERENCES product(id),
  name VARCHAR(200),
  sale_price INTEGER,
  original_price INTEGER,
  default_style BOOLEAN
);

CREATE TABLE skus(
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  styleId INTEGER REFERENCES styles(id),
  size VARCHAR(10),
  quantity INTEGER
);

CREATE TABLE photos(
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  styleId INTEGER REFERENCES styles(id),
  url TEXT,
  thumbnail_url TEXT
);

-- ETL code
COPY product FROM '/Users/jessicachen/Downloads/product.csv' DELIMITER ',' CSV HEADER;
COPY related FROM '/Users/jessicachen/Downloads/related.csv' DELIMITER ',' CSV HEADER where related_product_id > 0;
COPY features FROM '/Users/jessicachen/Downloads/features.csv' DELIMITER ',' CSV HEADER;
COPY styles FROM '/Users/jessicachen/Downloads/styles.csv' DELIMITER ',' NULL AS 'null' CSV HEADER;
COPY skus FROM '/Users/jessicachen/Downloads/skus.csv' DELIMITER ',' CSV HEADER;
COPY photos FROM '/Users/jessicachen/Downloads/photos.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE product
ADD COLUMN IF NOT EXISTS campus VARCHAR(6) DEFAULT 'hr-rfp',
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- function and trigger for updatedAt
CREATE FUNCTION set_updatedAt() RETURNS TRIGGER AS $$
  BEGIN
    OLD.updated_at = NOW();
    RETURN OLD;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_updatedAt
  BEFORE UPDATE ON product
  FOR EACH ROW
  EXECUTE FUNCTION set_updatedAt();

-- query to get products, execute with $ SELECT * FROM get_products ORDER BY id LIMIT 5;
CREATE OR REPLACE VIEW get_products AS
SELECT id, campus, name, slogan, description, category, default_price, created_at, updated_at FROM product /*order by id limit 5*/;

-- function to get one product by argument product_id, formatted as an object
-- execute with $ SELECT get_one_product(1);
CREATE OR REPLACE FUNCTION get_one_product (target INTEGER)
RETURNS JSON AS $$
  DECLARE
    one_id INTEGER := target;
    featArr JSON;
  BEGIN
    SELECT INTO featArr (SELECT JSON_AGG(e) from (select f.feature, f.value FROM product AS p
    INNER JOIN features as f ON p.id = f.product_id WHERE p.id=one_id)e);
    RETURN JSON_BUILD_OBJECT('id', p.id, 'campus', p.campus, 'name', p.name, 'slogan', p.slogan, 'description', p.description,
    'category', p.category, 'default_price', p.default_price, 'created_at', p.created_at, 'updated_at', p.updated_at, 'features', featArr)
    FROM product AS p
    INNER JOIN features as f ON p.id = f.product_id WHERE p.id=one_id
    GROUP BY p.id;
  END;
$$ LANGUAGE plpgsql;




/* Original Denormalized tables
CREATE TABLE product(
  id INTEGER PRIMARY KEY,
  campus VARCHAR(6) DEFAULT 'hr-rfp',
  name VARCHAR(200),
  slogan VARCHAR(200),
  description TEXT,
  category VARCHAR(50),
  default_price INTEGER,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  features JSON,
  related INTEGER[]
);

CREATE FUNCTION set_updatedAt() RETURNS TRIGGER AS $$
  BEGIN
    OLD.updated_at = NOW();
    RETURN OLD;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_updatedAt
  BEFORE UPDATE ON product
  FOR EACH ROW
  EXECUTE FUNCTION set_updatedAt();

CREATE TABLE style(
  style_id INTEGER PRIMARY KEY,
  product_id INTEGER REFERENCES product(id), -- might remove
  name VARCHAR(200),
  original_price VARCHAR(10),
  sale_price VARCHAR(10),
  'default?' BOOLEAN DEFAULT false,
  photos JSON[],
);

CREATE TABLE sku(
  sku_id INTEGER PRIMARY KEY,
  style_id INTEGER REFERENCES style(style_id), -- might remove
  quantity INTEGER,
  size VARCHAR(5)
);
*/

/* makes an array of objects for features
update product set features = (select json_agg(e) from (select feature, value from test_features where product_id = product.id)e);
*/