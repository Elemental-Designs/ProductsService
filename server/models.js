const query = require('../database/index.js');

module.exports = {
  readProducts({page, count}) {
    const text = `
    SELECT
      id,
      campus,
      name,
      slogan,
      description,
      category,
      to_char(default_price, 'FM999999D00') AS default_price,
      created_at,
      updated_at
    FROM product
    ORDER BY id
    OFFSET $1
    LIMIT $2;
    `;
    let offset = (Number(page) - 1) * Number(count);
    let values = [offset, count];
    return query(text, values);
  },

  readOneProduct({product_id}) {
    const text = `
    SELECT
      p.id,
      p.campus,
      p.name,
      p.slogan,
      p.description,
      p.category,
      to_char(p.default_price, 'FM9999999D00') AS default_price,
      p.created_at,
      p.updated_at,
      COALESCE(
        (SELECT JSON_AGG(e) FROM
          (SELECT f.feature, f.value FROM features AS f WHERE f.product_id=$1)e
        )
      , '[]') AS features
    FROM product AS p
    WHERE p.id=$1;
    `;
    return query(text, [product_id]);
  },

  readStyles({product_id}) {
    const text = `
    SELECT
      $1 AS product_id,
      COALESCE(
        (SELECT JSON_AGG(e) FROM (
          SELECT
            s.id AS style_id,
            s.name,
            to_char(s.original_price, 'FM9999D00') AS original_price,
            CASE
              WHEN s.sale_price=null THEN null
              ELSE to_char(s.sale_price, 'FM9999D00')
            END AS sale_price,
            s.default_style AS "default?",
            COALESCE(
              (SELECT JSON_AGG(f) FROM
                (SELECT ph.thumbnail_url, ph.url FROM photos AS ph WHERE ph.styleId=s.id)f)
            , '[]') AS photos,
            COALESCE(
              (SELECT JSON_OBJECT_AGG(skus.id,
                (SELECT JSON_BUILD_OBJECT(
                  'quantity', skus.quantity,
                  'size', skus.size)
                )
              ) FROM skus WHERE skus.styleId=s.id)
            , '{}') AS skus
          FROM styles AS s WHERE s.productId = to_number($1, '999999'))e)
        , '[]') AS results;
    `;
    return query(text, [product_id]);
  },

  readRelated({product_id}) {
    const text = `
    SELECT
      COALESCE(
        TO_JSON(
          ARRAY(
            SELECT r.related_product_id
            FROM related AS r
            WHERE r.current_product_id=$1
          )
        )
      , '[]') AS results;
    `;
    return query(text, [product_id]);
  }
};
