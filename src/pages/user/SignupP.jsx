// D:\team\meloa-main\src\pages\user\SignupP.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import axios from "axios"; // 나중에 백엔드 연동 시 사용

const SignupP = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nickname: "",
    userId: "",
    password: "",
    confirmPassword: "",
    emailId: "",
    emailDomain: "naver.com",
    emailDomainText: "",
    phoneNumber: "",
    agreements: {
      terms: false,
      privacy: false,
      location: false,
      marketing: false,
      all: false,
    },
  });

  const dummyUser = {
    userId: "meloa123",
    password: "1234",
    nickname: "meloa",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;

    if (name === "all") {
      setFormData((prev) => ({
        ...prev,
        agreements: {
          terms: checked,
          privacy: checked,
          location: checked,
          marketing: checked,
          all: checked,
        },
      }));
    } else {
      setFormData((prev) => {
        const newAgreements = { ...prev.agreements, [name]: checked };
        const allChecked =
          newAgreements.terms &&
          newAgreements.privacy &&
          newAgreements.location &&
          newAgreements.marketing;

        return {
          ...prev,
          agreements: { ...newAgreements, all: allChecked },
        };
      });
    }
  };

  const validateForm = () => {
    if (!formData.agreements.terms || !formData.agreements.privacy) {
      alert("필수 약관에 동의해주세요.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      alert("비밀번호는 최소 8자 이상, 영문과 숫자를 포함해야 합니다.");
      return false;
    }

    const email =
      formData.emailDomain === "custom"
        ? `${formData.emailId}@${formData.emailDomainText}`
        : `${formData.emailId}@${formData.emailDomain}`;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("올바른 이메일 형식을 입력해주세요.");
      return false;
    }

    if (!formData.phoneNumber.trim()) {
      alert("전화번호를 입력해주세요.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const signupData = {
      nickname: formData.nickname,
      userId: formData.userId,
      password: formData.password,
      email:
        formData.emailDomain === "custom"
          ? `${formData.emailId}@${formData.emailDomainText}`
          : `${formData.emailId}@${formData.emailDomain}`,
      phone: formData.phoneNumber,
      agreements: formData.agreements,
    };

    // ✅ 백엔드 연동 시 아래 코드 사용
    /*
    try {
      const response = await axios.post("http://localhost:4000/api/signup", signupData);
      if (response.status === 201 || response.status === 200) {
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        alert("이미 존재하는 닉네임 또는 아이디입니다.");
      } else {
        console.error("회원가입 오류:", error);
        alert("회원가입 중 오류가 발생했습니다.");
      }
    }
    */

    // ✅ 현재는 임시 처리
    alert("회원가입이 완료되었습니다! (임시)");
    navigate("/login");
  };

  const checkDuplicate = (type) => {
    if (type === "닉네임") {
      if (!formData.nickname) return alert("닉네임을 입력해주세요.");
      if (formData.nickname === dummyUser.nickname) {
        alert("이미 존재하는 닉네임입니다.");
      } else {
        alert("사용 가능한 닉네임입니다.");
      }
    }

    if (type === "아이디") {
      if (!formData.userId) return alert("아이디를 입력해주세요.");
      if (formData.userId === dummyUser.userId) {
        alert("이미 존재하는 아이디입니다.");
      } else {
        alert("사용 가능한 아이디입니다.");
      }
    }
  };

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <SignupWrapper>
      <SignupForm onSubmit={handleSubmit}>
        <InputGroup>
          <label>닉네임</label>
          <InputWithButton>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleInputChange}
              placeholder="닉네임을 입력하세요"
              required
            />
            <button
              type="button"
              className="check-button"
              onClick={() => checkDuplicate("닉네임")}
            >
              중복확인
            </button>
          </InputWithButton>
        </InputGroup>

        <InputGroup>
          <label>아이디 입력</label>
          <InputWithButton>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              placeholder="아이디를 입력하세요"
              required
            />
            <button
              type="button"
              className="check-button"
              onClick={() => checkDuplicate("아이디")}
            >
              중복확인
            </button>
          </InputWithButton>
        </InputGroup>

        <InputGroup>
          <label>비밀번호 입력</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="최소 8자, 영문+숫자 포함"
            required
          />
        </InputGroup>

        <InputGroup>
          <label>비밀번호 확인</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="비밀번호를 다시 입력하세요"
            required
          />
        </InputGroup>

        <InputGroup>
          <label>이메일</label>
          <EmailInputRow>
            <input
              type="text"
              name="emailId"
              placeholder="아이디"
              value={formData.emailId}
              onChange={handleInputChange}
              required
            />
            <span className="at">@</span>
            {formData.emailDomain === "custom" ? (
              <input
                type="text"
                name="emailDomainText"
                placeholder="도메인 입력"
                value={formData.emailDomainText}
                onChange={handleInputChange}
                required
              />
            ) : (
              <select
                name="emailDomain"
                value={formData.emailDomain}
                onChange={handleInputChange}
                required
              >
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="daum.net">daum.net</option>
                <option value="custom">직접입력</option>
              </select>
            )}
          </EmailInputRow>
        </InputGroup>

        <InputGroup>
          <label>전화번호</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="전화번호를 입력하세요"
            required
          />
        </InputGroup>

        <AgreementSection>
          {[
            { name: "all", label: "모두 동의합니다" },
            { name: "terms", label: "이용약관 동의 (필수)" },
            { name: "privacy", label: "개인정보 처리방침 동의 (필수)" },
            { name: "location", label: "위치정보 이용약관 동의 (선택)" },
            { name: "marketing", label: "마케팅 정보 수신 동의 (선택)" },
          ].map(({ name, label }) => (
            <div key={name} className="agreement-item">
              <label>
                <input
                  type="checkbox"
                  name={name}
                  checked={formData.agreements[name]}
                  onChange={handleAgreementChange}
                />
                {label}
              </label>
            </div>
          ))}
        </AgreementSection>

        <MainButton type="submit">회원가입하기</MainButton>
        <BackButton type="button" onClick={handleBack}>
          뒤로가기
        </BackButton>
      </SignupForm>
    </SignupWrapper>
  );
};

export default SignupP;

// ✅ styled-components 정의
const SignupWrapper = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 32px 16px;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 600;
    font-size: 14px;
  }
`;

const InputWithButton = styled.div`
  display: flex;
  gap: 8px;

  input {
    flex: 1;
  }

  .check-button {
    flex-shrink: 0;
    background: #ddd;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;

    &:hover {
      background: #bbb;
    }
  }
`;

const EmailInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .at {
    font-weight: bold;
  }

  select,
  input {
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
`;

const AgreementSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;

  .agreement-item {
    display: flex;
    align-items: center;

    input {
      margin-right: 6px;
    }
  }
`;

const MainButton = styled.button`
  padding: 12px;
  background-color: #333;
  color: white;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #222;
  }
`;

const BackButton = styled.button`
  padding: 10px;
  background-color: transparent;
  border: 1px solid #ccc;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;
