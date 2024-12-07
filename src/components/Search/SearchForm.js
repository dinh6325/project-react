import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { SearchContext } from '../../context/SearchContext';
import '../../assets/css/SearchForm.css';
import rooms from '../../data/data'; // Giả sử bạn đã có dữ liệu phòng ở đây

const SearchForm = () => {
  const { updateSearchResults } = useContext(SearchContext);
  const navigate = useNavigate(); // Hook để điều hướng
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [roomsCount, setRoomsCount] = useState(1);
  const [destination, setDestination] = useState('');

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleSearchClick = () => {
    if (!destination.trim() || guests <= 0 || roomsCount <= 0) {
      alert('Vui lòng điền đầy đủ thông tin hợp lệ.');
      return;
    }
    alert(`Điểm đến: ${destination}, Số khách: ${guests}, Số phòng: ${roomsCount}`);

    const searchResults = rooms.filter((room) => {
      const isDestinationMatch = room.address.toLowerCase().includes(destination.toLowerCase());
      return isDestinationMatch;
    });

    if (searchResults.length === 0) {
      alert('Không tìm thấy kết quả phù hợp.');
    } 
    // Cập nhật kết quả tìm kiếm vào context
    updateSearchResults(searchResults);

    // Điều hướng đến trang kết quả tìm kiếm
    navigate('/search-results');
  };

  return (
    <div className="search-form">
      <div className="input-container">
        <label>Điểm đến</label>
        <input
          type="text"
          className="form-control"
          placeholder="Điểm đến (ví dụ: Phú Quốc)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div className="date-picker-container">
        <label>Chọn ngày</label>
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          dateFormat="dd/MM/yyyy"
          className="form-control"
          minDate={new Date()}
          placeholderText="Chọn ngày"
          calendarClassName="custom-calendar"
        />
      </div>
      <div className="guests-room-container">
        <div className="input-container">
          <label>Số khách</label>
          <input
            type="number"
            className="form-control"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min="1"
          />
        </div>
        <div className="input-container">
          <label>Số phòng</label>
          <input
            type="number"
            className="form-control"
            value={roomsCount}
            onChange={(e) => setRoomsCount(e.target.value)}
            min="1"
          />
        </div>
      </div>
      <button className="btn-search" onClick={handleSearchClick}>
        <FaSearch /> Tìm kiếm
      </button>
    </div>
  );
};

export default SearchForm;
