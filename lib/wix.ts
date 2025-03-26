export async function getWixPosts() {
    const response = await fetch("https://www.wixapis.com/blog/v1/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer TU_API_KEY`,
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Error al obtener los posts de Wix");
    }
  
    const data = await response.json();
    return data.posts; // Ajusta según la respuesta de Wix
  }
  