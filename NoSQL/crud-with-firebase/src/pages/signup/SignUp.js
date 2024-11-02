// signup componnet
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { signup } from "../../store/slices/authSlice";
import { useNavigate } from 'react-router-dom';
import Loading from "../../components/loading/Loading";


export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [gender, setGender] = useState("")
  const loading = useSelector((state) => state.authSlice.loading);

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSignup = () => {
    let user = {
      email,
      password,
      name,
      phone,
      address,
      gender
    }
    console.log("Signup clicked", user);
    dispatch(signup(user))
    navigate('/login');
  }

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Signup<button onClick={() => navigate('/login')} className="l-btn">
          <h1>/Login</h1>
        </button>
        </h1>
        <input
          type="text"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter phone number"
          onChange={(e) => setPhone(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter address"
          onChange={(e) => setAddress(e.target.value)}
          className="input-field"
        />

        <div className="gender-section">
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={() => setGender('male')}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={() => setGender('female')}
            />
            Female
          </label>
        </div>

        <button onClick={handleSignup} className="signup-button">Signup</button>
        {loading && <Loading/>}
      </div>
    </div>
  )
}