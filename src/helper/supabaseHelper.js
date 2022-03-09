import { supabase } from "../supabase/supabaseClient";

export async function getProfile(userId) {
  try {
    let { data, error, status } = await supabase
      .from("profiles")
      .select(`username, avatar_url , PhoneNumber , email`)
      .eq("id", userId)
      .single();

    if (error && status !== 406) {
      throw error;
    }
    if (data) {
      return data;
    }
  } catch (error) {
    return error;
  }
}

export async function downloadImage(path ,  bucket) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(path);
    if (error) {
      throw error;
    }
    const url = URL.createObjectURL(data);
    return url;
  } catch (error) {
    return error;
  }
}

export async function updateProfile(username, avatar_url, PhoneNumber ) {
  try {
    const user = supabase.auth.user();

    const updates = {
      id: user.id,
      email: user.email,
      username,
      avatar_url,
      PhoneNumber,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("profiles").upsert(updates, {
      returning: "updated", // Don't return the value after inserting
    });

    if (error) {
      return error;
    } else {
      return "Updated successfully";
    }
  } catch (error) {
    alert(error.message);
  }
}

export async function updateProduct(data) {
  try {
    const user = supabase.auth.user();

    const updates = {
      ...data,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("products").upsert(updates, {
      returning: "updated", // Don't return the value after inserting
    });

    if (error) {
      return error;
    } else {
      return "Updated successfully";
    }
  } catch (error) {
    alert(error.message);
  }
}


export async function updateAvatar(avatar_url) {
  try {
    const user = supabase.auth.user();
    const updates = {
      id: user.id,
      avatar_url,
      updated_at: new Date(),
    };
    let { error } = await supabase.from("profiles").upsert(updates, {
      returning: "minimal", // Don't return the value after inserting
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    alert(error.message);
  }
}

export async function getProductsByUserId(userId) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select()
      .eq("user", userId);

    if (data) {
      return data;
    }

    if (error) {
      throw error;
    }
  } catch (error) {
    alert(error.message);
  }
}

export async function getProductById(ProductId) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select()
      .eq("id", ProductId);

    if (data) {
      return data;
    }
    if (error) {
      throw error;
    }
  } catch (error) {
    alert(error.message);
  }
}

