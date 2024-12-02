import React, { useEffect, useState } from 'react';
import axios from "axios";
import Rooms from '../components/Rooms';
import Loader from '../components/Loader';
import Error from '../components/Error';
import DatePicker from 'react-datepicker';
import moment from 'moment'
import style from '../styles/home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css';
function HomeScreen() {
    const { RangePicker } = DatePicker;
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [fromdate, setfromdate] = useState()
    const [todate, settodate] = useState()
    const [FromDate, setFromDate] = useState()
    const [ToDate, setToDate] = useState()
    const [duprooms, setduprooms] = useState()
    const [searchkey, setsearchkey] = useState()
    const user = JSON.parse(localStorage.getItem('currentuser'));
    const [types, settypes] = useState("all")
    const [search, setSearch] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:5000/api/rooms/getallrooms");
                setRooms(res.data);
                setduprooms(res.data)
                setLoading(false);
            } catch (error) {
                setError(true);
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const filter = () => {
        let filteredRooms = duprooms;  // Start with all rooms as the base

        // Apply date filter if both fromdate and todate are selected
        if (fromdate && todate) {
            const formattedFromDate = moment(fromdate).format('DD-MM-YYYY');
            const formattedToDate = moment(todate).format('DD-MM-YYYY');

            // Filter rooms based on availability within the date range
            filteredRooms = filteredRooms.filter(room => {
                const isAvailable = room.currentbookings.every(booking => {
                    return (
                        formattedFromDate !== booking.fromdate &&
                        formattedFromDate !== booking.todate &&
                        formattedToDate !== booking.fromdate &&
                        formattedToDate !== booking.todate
                    );
                });

                return isAvailable; // Only include rooms that are available during the selected dates
            });
        }

        // Apply type filter if a type is selected
        if (types !== 'all') {
            filteredRooms = filteredRooms.filter(room => {
                // Check if room.types exists and is a string before calling toLowerCase
                if (room.types && typeof room.types === 'string') {
                    return room.types.toLowerCase() === types.toLowerCase();
                }
                return false;  // Exclude rooms without a valid 'types' property
            });
        }

        // Set the filtered rooms
        setRooms(filteredRooms);
        setSearch(true)
    };

    // function filterByDate(dates, dateStrings) {
    //     setfromdate(dateStrings[0]);
    //     settodate(dateStrings[1]);

    //     var temprooms = [];

    //     for (const roomiterator of duprooms) {
    //         var availability = false; // Reset availability for each room
    //         if (roomiterator.currentbookings.length > 0) {
    //             let i = 0;
    //             console.log(roomiterator.name + ":" + roomiterator.currentbookings.length)
    //             for (const booking of roomiterator.currentbookings) {
    //                 if (dateStrings[0] !== booking.fromdate &&
    //                     dateStrings[0] !== booking.todate &&
    //                     dateStrings[1] !== booking.fromdate &&
    //                     dateStrings[1] !== booking.todate) {
    //                     availability = true;
    //                     console.log(roomiterator.name + " " + i++);
    //                 }

    //             }
    //         }
    //         if (availability === true || roomiterator.currentbookings.length === 0) {
    //             temprooms.push(roomiterator);
    //         }
    //     }


    //     setRooms(temprooms); // Update rooms state after the loop
    // }
    //  console.log(fromdate)


    const filterbysearch = async function () {
        const temprooms = duprooms.filter(room => room.guesthousename.toLowerCase().includes(searchkey.toLowerCase()))

        setRooms(temprooms)
    }
    const handleTypeChange = (e) => {
        settypes(e.target.value);  // Update the type state when user selects a new type
    };

    const filtertype = async function (e) {
        settypes(e)
        if (e !== 'all') {
            const temprooms = duprooms.filter(room => room.types.toLowerCase() === e.toLowerCase())
            setRooms(temprooms)
        }
        else {
            setRooms(duprooms)
        }
    }
    const handleFromDateChange = (date) => {
        if (date) {
            setfromdate(date);

        } else {
            setfromdate(null);   // Reset when no date is selected
        }
    };

    const handleToDateChange = (date) => {
        if (date) {
            settodate(date)

        } else {
            settodate(null);   // Reset when no date is selected
        }
    };
    useEffect(() => {
        if (fromdate) {
            setFromDate(moment(fromdate).format('DD-MM-YYYY'));
        }
    }, [fromdate]);

    useEffect(() => {
        if (todate) {
            setToDate(moment(todate).format('DD-MM-YYYY'));
        }
    }, [todate]);


    return (
        <div className={style.filter}>
            <div className={style.filterContainer}>
                <div className={style.filterInnerContainer}>

                    <div className={style.column}>
                        <div className={style.datePickerWrapper}>

                            <DatePicker
                                selected={fromdate}
                                onChange={handleFromDateChange}
                                dateFormat="dd MMM yyyy"
                                className={style.datePicker}
                                customInput={
                                    <div style={{ display: 'flex', cursor: 'pointer', gap: '5px' }}>
                                        <FontAwesomeIcon icon={faCalendarAlt} className={style.icon} />
                                        <div style={{ color: 'grey', fontSize: '14px' }}>Check in</div>
                                    </div>}

                            />
                            <div className={style.dateDisplay}>
                                {fromdate ? moment(fromdate).format('DD MMM YYYY') : ''}

                            </div>
                        </div>
                    </div>
                    <div className={style.verticalbar}></div>

                    <div className={style.column}>
                        <div className={style.datePickerWrapper}>

                            <DatePicker
                                selected={todate}
                                onChange={handleToDateChange}
                                dateFormat="dd MMM yyyy"
                                className={style.datePicker}
                                customInput={<div style={{ display: 'flex', cursor: 'pointer', gap: '5px' }}>
                                    <FontAwesomeIcon icon={faCalendarAlt} className={style.icon} />
                                    <div style={{ color: 'grey', fontSize: '14px' }}>Check Out</div>
                                </div>}
                            />
                            <div className={style.dateDisplay}>
                                {todate ? moment(todate).format('DD MMM YYYY') : ''}
                            </div>
                        </div>
                    </div>
                    <div className={style.verticalbar}></div>

                    <div className={style.column}>
                        <div className={style.typeCont}>
                            <select value={types} onChange={(e) => settypes(e.target.value)}>
                                <option value="all">All</option>
                                <option value="delux">Delux</option>
                                <option value="non-delux">Non-Delux</option>
                            </select>
                        </div>
                    </div>

                    <div
                        className={style.searchButton}
                        onClick={filter}
                    >
                        <FontAwesomeIcon icon={faSearch} style={{ fontSize: '18px', marginBottom: '5px' }} />
                        Search
                    </div>
                </div>
            </div>



            {search && <div className={style.grid}>
                {loading ? (
                    <h1><Loader /></h1>
                ) : (
                    rooms.map(room => (
                        <div className={style.box1} key={room._id}>
                            <Rooms room={room} fromdate={FromDate} todate={ToDate} />
                        </div>
                    ))
                )}
            </div>}
        </div>
    );
}

export default HomeScreen;