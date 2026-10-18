const fs=require('fs'),vm=require('vm');
const html=fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8');
const js=html.slice(html.indexOf('<script>')+8,html.lastIndexOf('</script>'));
const els={};const def={bud:{value:"1500"},diet:{value:"0"},qk:{checked:false},nf:{checked:false},mo:{value:"9"},pds:{checked:true},ent:{value:"5"},pp:{value:"0"},mil:{checked:false},fru:{checked:false},dia:{checked:false}};
const el=id=>els[id]||(els[id]=Object.assign({innerHTML:"",textContent:"",className:"",dataset:{},classList:{toggle(){}}},def[id]||{}));
const ctx={document:{getElementById:el,querySelectorAll:()=>[],documentElement:{}},navigator:{language:"en"},window:{},speechSynthesis:{},console,Math,Date,Set,Object,Array,JSON,Number,String,encodeURIComponent,setTimeout};
vm.createContext(ctx);vm.runInContext(js,ctx);
const run=c=>vm.runInContext(c,ctx);
function sc(label,setup){run(`members=[{a:32,s:"F",t:0},{a:36,s:"M",t:0},{a:8,s:"F",t:0},{a:5,s:"M",t:0}];ex=new Set();`);
 for(const k in def)Object.assign(el(k),def[k]);setup&&setup();run('upd()');
 const r=run(`cur.plan?{cost:Math.round(cur.plan.cost),items:cur.items.map(a=>a[0].name+" "+(a[1]/10).toFixed(1)),viol:cur.items.filter(a=>blockedBy(FOODS[a[0].i]).length||!dietOK(TG[a[0].name]||{},+$("diet").value)).map(a=>a[0].name)}:{infeasible:true,hints:hl().replace(/<[^>]+>/g,"|")}`);
 console.log("\n"+label+"\n",JSON.stringify(r));}
sc("default");
sc("peanut+gluten (child/adult)",()=>run(`members[2].al=["peanut"];members[0].al=["gluten"];drawX()`));
sc("milk+egg+lactose allergy, veg+egg diet",()=>{el("diet").value="1";run(`members[3].al=["milk","egg"];`)});
sc("vegan",()=>el("diet").value="3");
sc("jain",()=>el("diet").value="4");
sc("non-veg",()=>el("diet").value="2");
sc("diabetes+millet+fruit",()=>{el("dia").checked=el("mil").checked=el("fru").checked=true});
sc("vegan + soy+gluten+sesame+peanut (hard)",()=>{el("diet").value="3";run(`members[0].al=["soy","gluten","sesame","peanut"]`)});
sc("jain + quick + no fridge + fruit",()=>{el("diet").value="4";el("qk").checked=true;el("nf").checked=true;el("fru").checked=true});
sc("fish allergy non-veg, March",()=>{el("diet").value="2";el("mo").value="2";run(`members[1].al=["fish"]`)});
console.log("\nSAFETY HTML sample:",run('members[0].al=["peanut"];saf()').replace(/<[^>]+>/g," ").slice(0,300));
sc("forced infeasible: vegan, no fridge, exclude all millets+pulses, quick",()=>{el("diet").value="3";el("qk").checked=true;run(`ex=new Set(FOODS.map((f,i)=>["Ragi","Bajra","Jowar","Chana dal","Moong dal","Besan","Spinach","Fenugreek leaves"].includes(f[0])?i:-1).filter(i=>i>=0))`)});
sc("hindi render",()=>{run('setL(1)')});run('setL(0)');

// ---- weekly menu: totals must match plan
run('setL(0)');run('upd()');
const chk=run(`(()=>{const h=menuH();const rows=(h.match(/<tr><td><b>/g)||[]).length;return{rows,hasTable:h.includes("<table")}})()`);
console.log("\nmenu:",JSON.stringify(chk));
// ---- live price function with mocked fetch
global.fetch=async u=>({ok:true,json:async()=>({records:[{modal_price:"3000",arrival_date:"18/10/2026"},{modal_price:"3200",arrival_date:"18/10/2026"}]})});
process.env.DATA_GOV_API_KEY="x";
const h=require('../api/prices.js');let out;
h({query:{state:"Delhi"}},{setHeader(){},status(c){return{json:j=>{out=[c,j.prices["Potato"],j.prices["Wheat atta"],j.date]}}}}).then(()=>console.log("api:",JSON.stringify(out)));
