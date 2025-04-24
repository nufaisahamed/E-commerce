import React, { useState } from "react";
import axiosInstance from "../config/axiosConfig";


const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("gokul");

    const handleUpload = (e) => {
        e.preventDefault();
        console.log(file);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("username", username);
        //upload logic
        axiosInstance
            .post("/upload", formData)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className=" w-screen h-screen flex flex-col gap-40 justify-center items-center">
            <h1 className=" text-4xl font-bold">File upload with multer</h1>
            <form className=" " onSubmit={handleUpload}>
                <input
                    onChange={(e) => setFile(e.target.files[0])}
                    className=" border outline-none px-3 py-2"
                    type="file"
                    name=""
                    id=""
                />
                <button className=" border  bg-amber-500 px-3 py-2">Upload</button>
            </form>
        </div>
    );
};

export default FileUpload;