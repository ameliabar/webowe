import "./style.css";
import dayjs from "dayjs";

const API_BASE =
  "https://xtdctnkassvrgjnduhn.supabase.co/rest/v1/article";

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0ZGN0bmthc2ZzdnJnam5kdWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwODUxMTEsImV4cCI6MjA5NjY2MTExMX0.QsLP9NKLk85j3l7bWEafBI7gyCstzYdYC_xbj0LEMho";

const SELECT_URL =
  `${API_BASE}?select=*`;


let currentSort = "date_desc";


//przechwytywanie tegp

const fetchArticles = async () => {
  try {
    let orderParam = "";

    if (currentSort === "date_asc") {
      orderParam = "&order=created_at.asc";
    }

    if (currentSort === "date_desc") {
      orderParam = "&order=created_at.desc";
    }

    if (currentSort === "title_asc") {
      orderParam = "&order=title.asc";
    }

    const res = await fetch(SELECT_URL + orderParam, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};


const container = document.getElementById("articles");

const render = async () => {
  const data = await fetchArticles();

  container.innerHTML = "";

  data.forEach((a) => {
    const el = document.createElement("article");

    el.className =
      "bg-white p-6 rounded-lg shadow border-l-4 border-pink-400";

    el.innerHTML = `
      <h3 class="text-2xl font-bold text-pink-500" style="font-family: 'Playwrite GB J', cursive;">
      ${a.title}
      </h3>

      <p class="text-gray-600 mb-2">
        ${a.subtitle}
      </p>

      <p class="text-sm text-gray-500 mb-2">
        Autor: ${a.author}
      </p>

      <time class="block text-xs text-gray-400 mb-3">
        ${dayjs(a.created_at).format("DD-MM-YYYY")}
      </time>

      <p>
        ${a.content}
      </p>
    `;

    container.appendChild(el);
  });
};


document
  .getElementById("sortSelect")
  .addEventListener("change", (e) => {
    currentSort = e.target.value;
    render();
  });


//na dodanie art

document
  .getElementById("articleForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      title: document.getElementById("title").value,
      subtitle: document.getElementById("subtitle").value,
      author: document.getElementById("author").value,
      content: document.getElementById("content").value,
      created_at: document.getElementById("created_at").value,
      is_published: true,
    };

    await fetch(API_BASE, {
      method: "POST",
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    e.target.reset();
    render();
  });

render();