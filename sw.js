const routes = {
  "api": path => {
    const apiSubValues = {
      0:{
        someInfo: "hello",
        otherInfo: 0
      },
      1:{
        someInfo: "I love you",
        otherInfo: 1
      },
      2:{
        someInfo: "won't you tell me your name?",
        otherInfo: 2
      }
    }
    return {
      body: JSON.stringify(apiSubValues[path[2]], null, "  "),
      headers: {
        "Content-Type": "application/json"
      }
    }
  },
  "index.html": path => {
    return {
      body: `<html>
  <h1>title</h1>
  <div>
    some things go here<br>
    <a href="./api/0">clickable 0</a><br>
    <a href="./api/1">clickable 1</a><br>
    <a href="./api/2">clickable 2</a>
  </div>
</html>`,
      headers: {
        "Content-Type": "text/html"
      }
    }
  } 
}

/**
 * Fetch and log a given request object
 * @param {Request} request
 */
async function routeRequest( request ) {
  let url = new URL( request.url ),
    path = url.pathname.split("/"),
    defaultHeaders = {},
    response;
  
  console.log('Got request', request);

  //response = new Response( "<html>hello</hello>", { headers:{ "content-type": "text/html"} } );

  if( path[ 1 ] in routes ){
    let { body, headers } = routes[ path[ 1 ] ]( path );
    console.log("body");
    console.log(body);
    console.log("headers");
    console.log(headers);
    response = new Response( body, { headers: headers } );   
  } else {
    console.log( "retreiving unknown resource" );
    response = await fetch(request);
  }
  
  console.log('Got response', response);
  return response;
}

addEventListener('fetch', event => {
  event.respondWith( routeRequest( event.request ) );
});
