//typeof window !== "undefined"? (() => { 
  function generate_random_string(): string {
    let possible_values: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let random_numbers: Uint8Array = crypto.getRandomValues(new Uint8Array(128));
    return random_numbers.reduce((acc,x) => acc + possible_values[x % possible_values.length], "");
  }
  
  const generate_hash = async (plain:string) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }
  
  const encode_to_b64 = (input:ArrayBuffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g,'-')
    .replace(/\//g, '_');
  }
  
  export async function get_code() {
    //requesting the code
    let code_verifier: string = generate_random_string();
    console.log(code_verifier);

    window.localStorage.setItem('code_verifier',code_verifier);
    let hashed = await generate_hash(code_verifier);
    let code_challenge: string = encode_to_b64(hashed);
  
    let request_headers = {
      "client_id": client_id,
      "response_type": "code",
      "redirect_uri": redirect_url,
      //"state": state,   //to be added
      "scope": 'user-top-read user-read-email user-read-private',
      "code_challenge_method": "S256",
      "code_challenge": code_challenge,
  
    };
    let auth_url = new URL(auth_base_url);
    auth_url.search = new URLSearchParams(request_headers).toString();
    //window.open(auth_url.toString());
    window.location.href = auth_url.toString(); 
    //let url_parameters = new URLSearchParams(window.location.search);
    //let code = url_parameters.get("code");
    
  }
  export async function get_token(code:string){
    //requesting the token
    let code_verifier=window.localStorage.getItem('code_verifier')||"";
    let payload_body = {
      "grant_type": "authorization_code",
      "code": code,
      "redirect_uri": redirect_url,
      "client_id": client_id,
      "code_verifier": code_verifier,
    };
  
    let payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(payload_body),
    };
  
    let data = await fetch(token_base_url, payload);
      //.then(data => {
    let data_json = await data.json();
    window.localStorage.setItem('token',await data_json.access_token)
    window.localStorage.removeItem('code_verifier');
    function refresh(p:object){
      location.reload();
    };
    refresh(await data_json);
  }
  
  const client_id: string = "32426a32c5f94055871f2d73e5516465";
  const redirect_url: string = "http://localhost:8000";
  const auth_base_url: string = "https://accounts.spotify.com/authorize";
  const token_base_url: string = "https://accounts.spotify.com/api/token";

  //token = get_token()
//})(): "";
//export default token
