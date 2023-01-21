import React, { useEffect, useState } from 'react';
import '../../style/style.css';
import uuid4 from "uuid4";
import { Link } from 'react-router-dom';


const Home = () => {


    const [listData, setListData] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(()=> {

       const parsedData = getLocal();
       setListData(parsedData)

    },[refreshKey])


    // set data to local storage
    const setLocal = (arr) => {
        localStorage.setItem("records",JSON.stringify(arr));
    }

    // get data from local storage
    const getLocal = (arr) => {

        const parsed_arr= JSON.parse(localStorage.getItem("records"));
        return parsed_arr;

    }

    
    // submit from data to local storage 

    const handleSubmit = (e) => {

        e.preventDefault();
        
        const form = e.target;
        const name = form.name.value;
        const contact = form.contact.value;
        const id = uuid4();

        const entry = {
            
            id: id,
            name,
            contact
        } 

       
        // check if data already exist in local storage array //
        // else store data in empty array and store to local storage //

        let recordArray = [];
        
        let parsedArray = getLocal();

        if(parsedArray !== null) {
            parsedArray.push(entry)
            setLocal(parsedArray);
        }
        else {
            recordArray.push(entry)
            setLocal(recordArray);
        }
        

        form.reset();

        setRefreshKey(oldKey => oldKey +1) 

    }
    return (
        <div className='container'>
           <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <div className="input-group">
                        <label htmlFor="name">Name:</label>
                        <input className='input-field' name="name" type="text" placeholder="Name"/><br/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="contact">Contact:</label>
                        <input className='input-field' name="contact" type="text" placeholder="Contact"/><br/>
                    </div>
                    <input className='form-submit-btn' type="submit" value="submit" />
                </div> 
            </form>
           <div className="table-container">
                <h2>Contact Information</h2>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>                
                        <th>Details</th>                
                    </tr>
                    {
                        listData.map( ld=>
                            <tr key={ld.id}>
                                <td>{ld.name}</td>
                                <td>{ld.contact}</td>
                                <td><Link to={`/contact/${ld.id}`}><button className='td-button dt-button'>Details</button></Link></td>
                            </tr>
                        )
                    }
                </table>
           </div>
        </div>
    );
};

export default Home;