'use server';

import pool from "@/src/helper/db/db";

export async function getProductsAndBrands() {
  try {
    const query = `
      SELECT name as product_name, brand_name 
      FROM public.tbl_master
      WHERE is_active = true
    `;
    
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching products and brands:', error);
    throw new Error('Failed to fetch products and brands');
  }
}