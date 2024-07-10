const MySQL = "mysql";

async function getWord() {
  try {
    const response = await fetch("http://localhost:3000/getWord", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    console.log(result);

    let tabla = "";
    for (let i = 0; i < result.length; i++) {
      tabla += `
                <tr class="table-primary">
                    <td scope="row">${result[i].WordID}</td>
                    <td>${result[i].Word}</td>
                    <td>${result[i].Info}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick="WordDelete('${result[i].WordID}')">Delete</button>
                    </td>
                </tr>
            `;
    }
    document.getElementById("tablaPunto1").innerHTML = tabla;
    document.getElementById("tablaPunto1").style.display = "block";

    tabla = `<table><tr><td>${tabla}</td></tr></table>`;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function escondoTablaWord() {
  document.getElementById("tablaPunto1").style.display = "none";
}

async function wordPost() {
  // Show confirmation dialog
  if (confirm("Are you sure you want to insert this record?")) {
    const data = {
      WordID: document.getElementById("WordIDPost").value,
      Word: document.getElementById("WordPost").value,
      Info: document.getElementById("InfoPost").value,
    };

    try {
      const response = await fetch("http://localhost:3000/insertWord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to insert data");
      }
      return getWord();
      console.log("Data inserted successfully:", data);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  }
}

async function WordDelete(WordID) {
  // Show confirmation dialog
  if (confirm("Are you sure you want to delete this record?")) {
    const objeto = {
      WordID: WordID,
    };

    try {
      const response = await fetch("http://localhost:3000/deleteWord", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objeto),
      });

      if (!response.ok) {
        throw new Error("Failed to delete data");
      }

      console.log("Data deleted successfully");
      return getWord();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }
}

async function wordPut() {
  if (confirm("Are you sure you want to update this record?")) {
    const objeto = {
      WordID: document.getElementById("WordIDPut").value,
      Word: document.getElementById("WordPut").value,
      Info: document.getElementById("InfoPut").value,
    };

    try {
      const response = await fetch("http://localhost:3000/putWord", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objeto),
      });

      if (!response.ok) {
        throw new Error("Failed to update data");
      }
      return getWord();
      console.log("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }
}

//User

async function getUser() {
  try {
    const response = await fetch("http://localhost:3000/getUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    console.log(result);

    let tabla = "";
    for (let i = 0; i < result.length; i++) {
      tabla += `
                <tr class="table-primary">
                    <td scope="row">${result[i].UserID}</td>
                    <td>${result[i].Username}</td>
                    <td>${result[i].Email_Address}</td>
                    <td>${result[i].Password}</td>
                    <td>${result[i].Name}</td>
                    <td>${result[i].Surname}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick="userDelete('${result[i].UserID}')">Delete</button>
                    </td>
                </tr>
            `;
    }
    document.getElementById("tablaPunto2").innerHTML = tabla;
    document.getElementById("tablaPunto2").style.display = "block";

    tabla = `<table><tr><td>${tabla}</td></tr></table>`;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function escondoTablaUser() {
  document.getElementById("tablaPunto2").style.display = "none";
}

async function userPost() {
  // Show confirmation dialog
  
  if (confirm("Are you sure you want to insert this record?")) {
    event.preventDefault();
    const data = {
      // UserID: document.getElementById("UserIDPost").value,
      Username: document.getElementById("UsernamePost").value,
      Email_Address: document.getElementById("EmailaddressPost").value,
      Password: document.getElementById("PasswordPost").value,
      Name: document.getElementById("NamePost").value,
      Surname: document.getElementById("SurnamePost").value,
    };
    

    try {
      const response = await fetch("http://localhost:3000/insertUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to insert data");
      }
      return getUser();
      console.log("Data inserted successfully:", data);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  }
}

async function userDelete(UserID) {
  // Show confirmation dialog
  if (confirm("Are you sure you want to delete this record?")) {
    const objeto = {
      UserID: UserID,
    };

    try {
      const response = await fetch("http://localhost:3000/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objeto),
      });

      if (!response.ok) {
        throw new Error("Failed to delete data");
      }

      console.log("Data deleted successfully");
      return getUser();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }
}

async function userPut() {
  if (confirm("Are you sure you want to update this record?")) {
    const objeto = {
      UserID: document.getElementById("UserIDPut").value,
      Username: document.getElementById("UsernamePut").value,
      Email_Address: document.getElementById("EmailaddressPut").value,
      Password: document.getElementById("PasswordPut").value,
      Name: document.getElementById("NamePut").value,
      Surname: document.getElementById("SurnamePut").value,
    };

    try {
      const response = await fetch("http://localhost:3000/putUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objeto),
      });

      if (!response.ok) {
        throw new Error("Failed to update data");
      }
      return getUser();
      console.log("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }
}

// GAMES

async function getGame() {
  try {
    const response = await fetch("http://localhost:3000/getGame", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    console.log(result);

    let tabla = "";
    for (let i = 0; i < result.length; i++) {
      tabla += `
                <tr class="table-primary">
                    <td scope="row">${result[i].GameID}</td>
                    <td>${result[i].UserID}</td>
                    <td>${result[i].LastWord}</td>
                    <td>${result[i].BestStreak}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick="gameDelete('${result[i].GameID}')">Delete</button>
                    </td>
                </tr>
            `;
    }
    document.getElementById("tablaPunto3").innerHTML = tabla;
    document.getElementById("tablaPunto3").style.display = "block";

    tabla = `<table><tr><td>${tabla}</td></tr></table>`;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function escondoTablaGame() {
  document.getElementById("tablaPunto3").style.display = "none";
}

async function gamePost() {
  // Show confirmation dialog
  if (confirm("Are you sure you want to insert this record?")) {



    const data = {
      // GameID: document.getElementById("GameIDPost").value,
      UserID: document.getElementById("UserIDPostG").value,
      LastWord: document.getElementById("LastWordPost").value,
      BestStreak: document.getElementById("BestStreakPost").value,
    };
    console.log(data);
    console.log(data.UserID);
    try {
      const response = await fetch("http://localhost:3000/insertGame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to insert data");
      }
      return getGame();
      console.log("Data inserted successfully:", data);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  }
}

async function gameDelete(GameID) {
  // Show confirmation dialog
  if (confirm("Are you sure you want to delete this record?")) {
    const objeto = {
      GameID: GameID,
    };

    try {
      const response = await fetch("http://localhost:3000/deleteGame", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objeto),
      });

      if (!response.ok) {
        throw new Error("Failed to delete data");
      }

      console.log("Data deleted successfully");
      return getGame();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }
}

async function gamePut() {
  if (confirm("Are you sure you want to update this record?")) {
    const objeto = {
      GameID: document.getElementById("GameIDPut").value,
      UserID: document.getElementById("UserIDPutG").value,
      Time: document.getElementById("LastWordPut").value,
      BestStreak: document.getElementById("BestStreakPut").value,
    };
    console.log(objeto);
    try {
      const response = await fetch("http://localhost:3000/putGame", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objeto),
      });

      if (!response.ok) {
        throw new Error("Failed to update data");
      }
      return getGame();
      console.log("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }
}
