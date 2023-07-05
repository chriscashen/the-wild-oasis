import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(`cabins error: ${error.message}`);
    throw new Error(error.message);
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(`cabins error: ${error.message}`);
    throw new Error(error.message);
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. create new cabin
  let query = supabase.from("cabins");

  // A) Create new cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) Edit existing cabin
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id)

  const { data, error } = await query.select().single();

  if (error) {
    console.log(`cabins error: ${error.message}`);
    throw new Error(error.message);
  }

  // 2. upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete cabin if image upload fails
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("cabin image could not be uploaded, cabin not created");
  }

  return data;
}
