import { Buffer } from "buffer";
import CryptoJS from "crypto-js";

let token: string = ""

typeof window !== "undefined"? (() => { 
  function generate_random_string(): string {
    let possible_values: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let random_numbers: Uint8Array = crypto.getRandomValues(new Uint8Array(128));
    let values: string = "";
    for (var element of random_numbers) {
        values += possible_values[element % possible_values.length];
    }
  
    return values;
  }
  
  function generate_hash(text: string): string {
    return CryptoJS.SHA256(text).toString(CryptoJS.enc.Hex);
  }
  
  function encode_to_b64(text: string): string {
    let encoded: string = Buffer.from(text, "binary").toString("base64");
    return encoded;
  }
  
  function get_token() {
    //requesting the code
    let code_verifier: string = generate_random_string();
    let hashed: string = generate_hash(code_verifier);
    let code_challenge: string = encode_to_b64(hashed);
  
    let request_headers = {
      "client_id": client_id,
      "response_type": "code",
      "redirect_uri": redirect_url,
      //"state": state,   //to be added
      //"scope": scope,
      "code_challenge_method": "S256",
      "code_challenge": code_challenge,
  
    };
  
    let auth_url = new URL(auth_base_url);
    auth_url.search = new URLSearchParams(request_headers).toString();
    window.location.href = auth_url.toString(); 
  
    let url_parameters = new URLSearchParams(window.location.search);
    let code = url_parameters.get("code");
    
    //requesting the token
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
  
    fetch(token_base_url, payload)
      .then(data => {
        let data_json = data.json();
        return data_json.access_token;
      });
  }
  
  const client_id: string = "32426a32c5f94055871f2d73e5516465";
  const redirect_url: string = "https://disco-listening-habits.netlify.app/";
  const auth_base_url: string = "https://accounts.spotify.com/authorize";
  const token_base_url: string = "https://accounts.spotify.com/api/token";
  
  token = get_token()
})(): "";

export default token
