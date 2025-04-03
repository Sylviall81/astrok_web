import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
    "https://hzhecxarxqqxrwauwkfi.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6aGVjeGFyeHFxeHJ3YXV3a2ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNDIwMTAsImV4cCI6MjA1NzgxODAxMH0.ATJfwJMKd9lwaa9kx9-xF4nzZgSq3uDW6-aoKfqmZPU"  
)

async function testFetchProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })

  console.log("Resultado de Supabase:", data, error)
}

testFetchProducts()
