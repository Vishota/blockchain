import axios from 'axios'

const seed_source = 'http://127.0.0.1:3535'

async function getSeeds(): Promise<string[]> {
    //const seed_addresses : string[] = await axios.get(seed_source)
    return axios.get(seed_source);
}