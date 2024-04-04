import {create} from "zustand";

interface AppState {
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (open: boolean) => void;

    isRenameModalOpen: boolean;
    setIsRenameModalOpen: (open: boolean) => void;

    isShareModalOpen: boolean;
    setIsShareModalOpen: (open:boolean) => void;

    fileID: string | null;
    setFileID: (fileID: string) => void;

    filename: string;
    setFilename: (filename: string) => void;

    downloadUrl: string;
    setDownloadUrl: (downloadUrl:string) => void

    type: string;
    setType: (type:string) => void
}

export const useAppStore = create<AppState>((set) => ({
    fileID: null,
    setFileID: (fileID: string) => set((state) => ({fileID})),

    filename: "",
    setFilename: (filename: string) => set((state) => ({filename})),

    downloadUrl:"",
    setDownloadUrl: (downloadUrl:string) => set((state) => ({downloadUrl})),

    type:"",
    setType: (type:string) => set((state) => ({type})),

    isDeleteModalOpen: false,
    setIsDeleteModalOpen: (open: boolean) => set((state) => ({isDeleteModalOpen: open})),

    isRenameModalOpen: false,
    setIsRenameModalOpen: (open: boolean) => set((state) => ({isRenameModalOpen: open})),

    isShareModalOpen: false,
    setIsShareModalOpen: (open:boolean) => set((state) => ({isShareModalOpen:open})),
}))