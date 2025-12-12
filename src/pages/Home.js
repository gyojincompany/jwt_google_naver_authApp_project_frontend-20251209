import React from "react";
import { Shield, User, Camera } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "../components/Router";
import "./Home.css"; // ➜ 외부 CSS 파일 import

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-inner">
        <div className="text-center">
          <h1 className="home-title">
            Welcome To! <span className="title-accent">Auth Test App</span>
          </h1>

          <p className="home-subtitle">
            JWT, OAuth2, 역할 기반 접근 제어가 적용된 최신 인증 시스템입니다.
            Google‧Naver 간편 로그인 기능도 포함되어 있습니다.
          </p>

          <div className="button-wrap">
            {user ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="btn-primary"
              >
                대시보드로 이동
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="btn-primary"
                >
                  시작하기
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="btn-outline"
                >
                  회원가입
                </button>
              </>
            )}
          </div>

          <div className="grid-container">
            <div className="card">
              <div className="icon-wrap blue">
                <Shield className="icon" />
              </div>
              <h3 className="card-title">안전한 인증</h3>
              <p className="card-text">
                JWT 기반 인증 및 리프레시 토큰을 통한 향상된 보안 기능 제공
              </p>
            </div>

            <div className="card">
              <div className="icon-wrap purple">
                <User className="icon" />
              </div>
              <h3 className="card-title">OAuth2 연동</h3>
              <p className="card-text">
                Google · Naver 계정으로 간편하게 로그인하세요
              </p>
            </div>

            <div className="card">
              <div className="icon-wrap green">
                <Camera className="icon" />
              </div>
              <h3 className="card-title">역할 기반 권한</h3>
              <p className="card-text">
                사용자/관리자 권한에 따른 다양한 접근 제어 기능 연습 제공
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
