// Vercel Node.js Function: lê produtos públicos quando Supabase estiver configurado.
module.exports = async function handler(req,res){
  res.setHeader('Cache-Control','public, s-maxage=60, stale-while-revalidate=300');
  if(req.method!=='GET'){res.setHeader('Allow','GET');return res.status(405).json({error:'Método não permitido'});}
  const base=process.env.SUPABASE_URL;
  const key=process.env.SUPABASE_PUBLISHABLE_KEY;
  if(!base||!key)return res.status(200).json({products:[],source:'demo',configured:false});
  try{
    const url=new URL('/rest/v1/cantina_products',base);
    url.searchParams.set('select','id,name,description,category,price,emoji,available,featured');
    url.searchParams.set('available','eq.true');
    url.searchParams.set('order','name.asc');
    const response=await fetch(url,{headers:{apikey:key,Authorization:'Bearer '+key},signal:AbortSignal.timeout(7000)});
    if(!response.ok)throw new Error('Supabase HTTP '+response.status);
    const products=await response.json();
    if(!Array.isArray(products))throw new Error('Invalid response');
    return res.status(200).json({products,source:'supabase',configured:true});
  }catch(error){
    console.error('Menu database unavailable:',error.message);
    return res.status(503).json({error:'Cardápio temporariamente indisponível',products:[]});
  }
};