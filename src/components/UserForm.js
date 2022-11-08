import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import { TransactionContext } from '../contexts/TransactionContext';
import { FETCH_TRANSACTION } from '../reducers/transactionReducer';

function UserForm() {
  const params = useParams();
  const navigate = useNavigate();
  const { dispatch } = useContext(TransactionContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const [nameInput, setNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [userDetailInput, setUserDetailInput] = useState('');
  const [userNumberInput, setUserNumberInput] = useState('');

  useEffect(() => {
    if (params.userId) {
      axios
        .get('http://localhost:8009/users/getUserId/' + params.userId)
        .then((res) => {
          const { userNumber, name, lastName, phoneNumber, userDetail, email } =
            res.data.user;

          setNameInput(name);
          setLastNameInput(lastName);
          setUserNumberInput(userNumber);
          setEmailInput(email);
          setPhoneNumberInput(phoneNumber);
          setUserDetailInput(userDetail);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setNameInput('');
      setLastNameInput('');
      setUserNumberInput('');
      setEmailInput('');
      setPhoneNumberInput('');
      setUserDetailInput('');
    }
  }, [params.userId]);

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const inputError = {};
    if (validator.isEmpty(nameInput)) {
      inputError.name = 'จำเป็นต้องกรอกชื่อ';
    }
    if (validator.isEmpty(lastNameInput)) {
      inputError.lastName = 'จำเป็นต้องกรอกนามสกุล';
    }
    if (validator.isEmpty(emailInput)) {
      inputError.email = 'จำเป็นต้องกรอกอีเมล';
    }
    if (validator.isEmpty(phoneNumberInput + '')) {
      inputError.phoneNumber = 'จำเป็นต้องกรอกเบอร์โทรศัพท์';
    }
    if (validator.isEmpty(userNumberInput)) {
      inputError.userNumber = 'จำเป็นต้องกรอกเลขที่ผู้ใช้';
    }

    if (Object.keys(inputError).length > 0) {
      setError(inputError);
    } else {
      setError({});
    }

    try {
      const body = {
        name: nameInput,
        lastName: lastNameInput,
        email: emailInput,
        phoneNumber: phoneNumberInput + '',
        userDetail: userDetailInput,
        userNumber: userNumberInput,
      };

      if (params.userId) {
        await axios.put(
          'http://localhost:8009/users/updateUser/' + params.userId,
          body
        );
      } else {
        await axios.post('http://localhost:8009/users/createUser', body);
      }

      const res = await axios.get('http://localhost:8009/users/getUser');
      dispatch({
        type: FETCH_TRANSACTION,
        value: { transactions: res.data.users },
      });
      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        'http://localhost:8009/users/deleteUser/' + params.userId
      );

      const res = await axios.get('http://localhost:8009/users/getUser');
      dispatch({
        type: FETCH_TRANSACTION,
        value: { transactions: res.data.users },
      });
      navigate('/home');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="border bg-white rounded-2 p-3 ">
        <form className="row g-3" onSubmit={handleSubmitForm}>
          <div className="col-sm-6">
            <label className="form-label">ชื่อ</label>
            <input
              className={`form-control ${error.name ? 'is-invalid' : ''}`}
              type="text"
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
            />
            {error.name && <div className="invalid-feedback">{error.name}</div>}
          </div>
          <div className="col-sm-6">
            <label className="form-label">นามสกุล</label>
            <input
              className={`form-control ${error.lastName ? 'is-invalid' : ''}`}
              type="text"
              value={lastNameInput}
              onChange={(event) => setLastNameInput(event.target.value)}
            />
            {error.lastName && (
              <div className="invalid-feedback">{error.lastName}</div>
            )}
          </div>
          <div className="col-sm-6">
            <label className="form-label">เบอร์ติดต่อ</label>
            <input
              className={`form-control ${
                error.phoneNumber ? 'is-invalid' : ''
              }`}
              type="number"
              value={phoneNumberInput}
              onChange={(event) => setPhoneNumberInput(event.target.value)}
            />
            {error.phoneNumber && (
              <div className="invalid-feedback">{error.phoneNumber}</div>
            )}
          </div>
          <div className="col-sm-6">
            <label className="form-label">อีเมล</label>
            <input
              className={`form-control ${error.email ? 'is-invalid' : ''}`}
              type="email"
              value={emailInput}
              onChange={(event) => setEmailInput(event.target.value)}
            />
            {error.email && (
              <div className="invalid-feedback">{error.email}</div>
            )}
          </div>
          <div className="col-sm-6">
            <label className="form-label">เลขที่ผู้ใช้</label>
            <input
              className={`form-control ${error.userNumber ? 'is-invalid' : ''}`}
              type="number"
              value={userNumberInput}
              onChange={(event) => setUserNumberInput(event.target.value)}
            />
            {error.userNumber && (
              <div className="invalid-feedback">{error.userNumber}</div>
            )}
          </div>
          <div className="col-sm-12">
            <label className="form-label">ข้อมูลผู้ใช้</label>
            <textarea
              className="form-control"
              type="text"
              value={userDetailInput}
              onChange={(event) => setUserDetailInput(event.target.value)}
            />
          </div>

          <div className="col-12">
            <div className="d-grid mt-3">
              <button className="btn btn-primary">
                {params.userId ? 'SAVE' : 'CREATE'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {params.userId && (
        <div className="d-grid mt-5">
          <button
            className="btn btn-danger"
            onClick={handleClickDelete}
            disabled={loading}
          >
            Delete User
          </button>
        </div>
      )}
    </>
  );
}

export default UserForm;
