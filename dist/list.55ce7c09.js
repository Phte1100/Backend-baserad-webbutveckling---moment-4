document.addEventListener("DOMContentLoaded",function(){!function(){let e=localStorage.getItem("token");if(!e){console.log("No token found, redirecting to login."),window.location.href="index.html";return}fetch("https://auth-app-io0c.onrender.com/api/users",{headers:{Authorization:`Bearer ${e}`}}).then(e=>{if(!e.ok)throw Error(`Failed to fetch users. Status: ${e.status}`);return e.json()}).then(e=>{!function(e){let t=document.getElementById("usersList");e.forEach(e=>{let o=document.createElement("li");o.textContent=e.username,t.appendChild(o)})}(e)}).catch(e=>{console.error("Error:",e)})}()});
//# sourceMappingURL=list.55ce7c09.js.map
