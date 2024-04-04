export type FileType = {
    id: string,
    filename: string,
    fullName: string,
    timestamp: Date,
    type: string,
    size: number,
    downloadUrl: string,
    password:string,
}

export type SelectedFilesType = {
    filename: string,
    type: string,
    size: number,
    isAccepted: boolean
}