
export interface Geotag{
    id: string,
    name: string,
    country: string,
    placeType: string,
    full_name: string,
    country_code: string,
    cord: {lat: number, long: number}
}


export interface Tweet{
    id: string,
    userId: string,
    userName: string,
    text: string,
    date: string,
    geo : Geotag

}

export interface Vender{
    name: string,
    image: string,
    description: string,
    tweets: Tweet[],
    created : number,
    updated : number,

}