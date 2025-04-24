const apiBaseUrl = 'https://67ee152e4387d9117bbf4f07.mockapi.io/api/v1';
function Api(){
    let baseUrl;
    let baseHeaders;
    
    function init(
        url = apiBaseUrl, 
        headers = {"Content-Type": 'application/json'}
    )
    {
        baseUrl = url;
        baseHeaders = headers;
        return {
            get, post, put, del
        }
    }
    async function request(endpoint, method, bodyData, headers = {}){
        try{
            const options = {
                method,
                headers: {
                    ...baseHeaders,
                    ...headers
                },
                body: bodyData? JSON.stringify(bodyData) : null
            }
            const response = await fetch(baseUrl + endpoint, options);
            if (!response.ok){
                throw new Error(`Response status: ${response.status}`)
            }
            const data = await response.json();
            return data;
        }catch(err){
            console.log('error', err.message);
            throw err;
        }
    }
    async function get(endpoint,{
        limit,
        custom
    } = {}){
        let data = await request(endpoint, 'GET');
        if (custom){
            data = data.filter((datum, index)=>{
                return custom(datum, index, data);
            })
        }
        if (limit && data.length > limit)data.splice(limit);
        return data;
    }

    function post(endpoint, bodyData, headers){
        return request(endpoint, 'POST', bodyData, headers);
    }

    function put(endpoint, bodyData, headers){
        return request(endpoint, 'PUT', bodyData, headers);
    }

    function del(endpoint, bodyData, headers){
        return request(endpoint, 'DELETE', bodyData, headers);
    }
    return {init};
}

export {Api};