document.addEventListener("DOMContentLoaded",function(){localStorage.getItem("token")||(window.location.href="index.html"),function(){let e=localStorage.getItem("token");fetch("https://auth-app-io0c.onrender.com/api/protected",{headers:{Authorization:`Bearer ${e}`}}).then(e=>{if(!e.ok)throw 401===e.status&&(alert("Sessionen har gått ut. Vänligen logga in igen."),localStorage.removeItem("token"),window.location.href="index.html"),Error("Kunde inte hämta skyddad data.");return e.json()}).then(e=>{var t;Array.isArray(t=e)||(t=[t]),t.map(e=>({...e,username:e.username?e.username.replace(/(<([^>]+)>)/ig,""):"",password:e.password?e.password.replace(/(<([^>]+)>)/ig,""):""}))}).catch(e=>{console.error("Error:",e),document.getElementById("Feedback").textContent="Ett fel inträffade vid hämtning av data. Vänligen försök igen."})}()}),document.getElementById("logoutButton").addEventListener("click",function(){localStorage.removeItem("token"),document.getElementById("Feedback").textContent="Du har loggats ut.",setTimeout(()=>{window.location.href="index.html"},1e3)});
//# sourceMappingURL=list.7c7745b9.js.map
