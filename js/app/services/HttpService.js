class HttpService {
    
    static get(url, cb) {
        let result = null;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200) {
                cb(JSON.parse(xhr.responseText));
            }
        }
        xhr.send();
    }
}