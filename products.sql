/*
DROP DATABASE IF EXISTS atelier;

CREATE DATABASE atelier;

\c atelier;
*/

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
COPY product FROM '/product.csv' DELIMITER ',' CSV HEADER;
COPY related FROM '/related.csv' DELIMITER ',' CSV HEADER where related_product_id > 0;
COPY features FROM '/features.csv' DELIMITER ',' CSV HEADER;
COPY styles FROM '/styles.csv' DELIMITER ',' NULL AS 'null' CSV HEADER;
COPY skus FROM '/skus.csv' DELIMITER ',' CSV HEADER;
COPY photos FROM '/photos.csv' DELIMITER ',' CSV HEADER;

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