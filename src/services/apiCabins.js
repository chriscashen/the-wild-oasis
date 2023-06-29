import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(`cabins error: ${error.message}`);
    throw new Error(error.message);
  }

  return data;
}
