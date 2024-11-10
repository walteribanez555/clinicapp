import{a as c,b as d,d as h}from"./chunk-7QUWYAMQ.js";function p(a){let r;return a.form.forEach(e=>{e.dynamicFields.forEach(t=>{r=d(c({},r),{[t.data.id??t.data.title]:t.fieldFormControl.value})})}),r}var $={production:!0,api_url:"https://ebbc-179-60-117-159.ngrok-free.app/graphql",identity_url:"https://tly1a3n3b7.execute-api.us-east-1.amazonaws.com"};var u=class{constructor(){this.query=""}static fetchQuery(r,s){return h(this,null,function*(){let n=yield(yield fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:r})})).json();if(n.errors)throw new Error(`GraphQL Error: ${JSON.stringify(n.errors)}`);return n.data})}setRootType(r){return this.query+=`${r} {
`,this}addFieldWithArgs(r,s){let e=t=>typeof t=="string"?`"${t}"`:typeof t=="object"&&!Array.isArray(t)?`{ ${Object.entries(t).map(([i,o])=>`${i}: ${e(o)}`).join(", ")} }`:`${t}`,n=Object.entries(s).map(([t,i])=>`${t}: ${e(i)}`).join(", ");return this.query+=`  ${r}(${n}) {
`,this}addFunctionWithArgs(r,s){let e=t=>typeof t=="string"?`${t}`:typeof t=="object"&&!Array.isArray(t)?`{ ${Object.entries(t).map(([i,o])=>`${i}: ${e(o)}`).join(", ")} }`:`${t}`,n=Object.entries(s).map(([t,i])=>`${t}: ${e(i)}`).join(", ");return this.query+=`  ${r}(${n}) {
`,this}openBlock(r){return this.query+=`    ${r} {
`,this}addField(r){return this.query+=`      ${r}
`,this}closeBlock(){return this.query+=`    }
`,this}close(){return this.query+=`}
`,this}build(){return this.query}addFieldsFromParams(r){for(let[s,e]of Object.entries(r))e===!0&&this.addField(s);return this}addDeleteMutation(r,s){let e=Object.entries(s).map(([n,t])=>`${n}: "${t}"`).join(", ");return this.query+=`  ${r}(${e})
}
`,this}addMutation(r,s,e){return this.setRootType("mutation").addFieldWithArgs(r,s),e.forEach(n=>this.addField(n)),this.close(),this}};export{$ as a,u as b,p as c};
