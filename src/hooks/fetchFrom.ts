export async function fetchFrom <T>(url:string) {
    const response = await fetch(url);

    if (!response.ok) {
        return {
            response: null,
            error: {
                status: response.status,
                statusText: response.statusText,
            }
        }
    };

    const data: T | undefined | null = await response.json();
    console.log(data)

    if (!data) {
        return {
            response: null,
            error: {
                status: response.status,
                statusText: response.statusText
            }
        }
    };
    return {response: data, error: null}
}