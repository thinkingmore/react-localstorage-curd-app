import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../style/style.css';

const Contact = () => {
    
    const [listData, setListData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    
    const { id } = useParams();

    useEffect(()=>{
        const parsedData = JSON.parse(localStorage.getItem("records"));
        const filteredRecord = parsedData.filter(ld => ld.id === id);
        setListData(filteredRecord);
        
    },[refreshKey]);


    // const toggleEditing = () => {
    //     const edName = document.getElementById("name");
    //     const edContact = document.getElementById("contact");

    //     edName.classList.add("focus");
    //     edContact.classList.add("focus");

    //     setEdit(true);
    //     setEditBtn("Submit");

    //     const newName = edName.innerText;
    //     const newContact = edContact.innerText;

    //     console.log(newName,newContact);
    // }

    const toggleEdit = () => {

        const edName = document.getElementById("name");
        const edContact = document.getElementById("contact");

        const editBtn = document.getElementById("editBtn");
        const submitBtn = document.getElementById("submitBtn");

        // hide edit button and show remove button
        editBtn.classList.add("d-none");
        submitBtn.classList.remove("d-none");

        // set the contact table data editable
        edName.classList.add("focus");
        edContact.classList.add("focus");
        setEdit(true);

    }


    const handleEdit = () => {
        
        const editBtn = document.getElementById("editBtn");
        const submitBtn = document.getElementById("submitBtn");

        const edName = document.getElementById("name");
        const edContact = document.getElementById("contact");

        const newName = edName.innerText;
        const newContact = edContact.innerText;

        // update the data in local storage

        const parsedData = JSON.parse(localStorage.getItem("records"));
        const editObj = parsedData.findIndex(ld=> ld.id === id);
        parsedData[editObj].name =newName;
        parsedData[editObj].contact =newContact;

        localStorage.setItem("records",JSON.stringify(parsedData));
        
        //show edit button and remove submit button
        editBtn.classList.remove("d-none");
        submitBtn.classList.add("d-none");

        // remove outline from the editable field
        edName.classList.remove("focus");
        edContact.classList.remove("focus");

        // refresh the page to show updated data
        setRefreshKey(oldKey => oldKey +1)

    }
    return (
        <div className='container'>
           <div className="table-container">
                <h2>Contact Information</h2>
                <table>
                    <tr>

                        <th>#ID</th>
                        <th>Name</th>
                        <th>Contact</th>                
                        <th>Details</th>                
                    </tr>
                    {
                        listData.map( ld=>
                            <tr key={ld.id}>
                                <td>{ld.id}</td>
                                <td id="name" contentEditable={edit}>{ld.name}</td>
                                <td id="contact" contentEditable={edit}>{ld.contact}</td>
                                <td>
                                    <button id="editBtn" onClick={toggleEdit} className='td-button edit-button'>Edit</button>
                                    <button id="submitBtn" onClick={handleEdit} className='td-button submit-button d-none'>Submit</button>
                                </td>
                            </tr>
                        )
                    }
                </table>
           </div>
        </div>
    );
};

export default Contact;