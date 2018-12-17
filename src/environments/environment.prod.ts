export const environment = {
  production: true
};

export const environment1 = {
  production: false,
  nasa_api_key1: "EvU3DzditQY4ezLs3w0QvGSLXlQOyF5NsKs2tfZM"
};

export const environment2 = {
  production : false, 
  nasa_api_key2 : 'XJtEhwjDtqK3p6oWeN3p8BGqgsPGS66ecVao5mzy'
} ;

let cosmoknotURL = '';
switch (window.location.hostname) {
   case 'localhost' || '127.0.0.1':
       cosmoknotURL = 'http://localhost:4666';
       break;
   case 'cosmoknot-client.herokuapp.com':
cosmoknotURL = 'https://cosmoknotserver.herokuapp.com'
}

export default cosmoknotURL;