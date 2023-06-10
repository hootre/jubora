'use client';

import { useForm } from 'react-hook-form';

const create = () => {
  const {
    handleSubmit,
    formState: { isValid, errors },
    trigger,
    register,
    watch,
  } = useForm();
  return (
    <form onSubmit={handleSubmit(createUser)}>
      <div className="titleLabel">
        <label htmlFor="titleLabel">제품등록</label>
      </div>
      <p className={`pointText ${errors.title && 'active'}`}>제목을 입력해주세요.</p>
      <input
        name="title"
        type="text"
        placeholder="제목"
        className={`input form-control ${errors.title && 'invalid'}`}
        required={true}
        defaultValue=""
        {...register('title', { required: '제목을 입력해주세요.' })}
        onKeyUp={() => {
          trigger('title');
        }}
      />
      <p className={`pointText ${errors.email && 'active'}`}>{errors.email?.message} </p>
      <input
        id="email"
        placeholder="이메일"
        className={`input ${errors.email && 'invalid'}`}
        name="email"
        type="email"
        required={true}
        {...register('email', {
          required: '이메일은 필수입니다',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: '이메일 형식을 지켜주세요',
          },
        })}
        onKeyUp={() => {
          trigger('email');
        }}
      ></input>
      <p className={`pointText ${errors.password && 'active'}`}>{errors.password?.message} </p>
      <input
        name="password"
        placeholder="비밀번호"
        id="password"
        type="password"
        autoComplete="off"
        className={`input form-control ${errors.password && 'invalid'}`}
        required={true}
        {...register('password', {
          required: '비밀번호는 필수입니다.',
          pattern: {
            value: /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
            message: '6~20 자의 영문대소문자, 숫자 및 특수문자 입력해 주세요',
          },
          minLength: {
            value: 6,
            message: '비밀번호는 최소 8글자 이상입니다.',
          },
          maxLength: {
            value: 20,
            message: '비밀번호는 최소 20글자 이하입니다.',
          },
        })}
        onKeyUp={() => {
          trigger('password');
        }}
      ></input>
      <p className={`pointText ${errors.confirmPassword && 'active'}`}>
        {errors.confirmPassword?.message}
      </p>
      <input
        id="confirmPassword"
        placeholder="비밀번호 확인"
        name="confirmPassword"
        type="password"
        {...register('confirmPassword', {
          validate: (value) => value === watch('password', '') || '비밀번호가 일치하지 않습니다.',
        })}
        autoComplete="off"
        onPaste={(e) => {
          e.preventDefault();
          return false;
        }}
        className={`input form-control ${errors.confirmPassword && 'invalid'}`}
        required={true}
        onKeyUp={() => {
          trigger('confirmPassowrd');
        }}
      />
      <div className="checkBox">
        <p className={`pointText ${errors.check && 'checkActive'}`}>{errors.check?.message}</p>
        <div className="all">
          <label className="label check">
            <input
              className={`label__checkbox ${errors.check && 'invalid'}`}
              {...register('check', {
                required: '약관에 동의 해주세요',
              })}
              required={true}
              type="checkbox"
              onKeyUp={() => {
                trigger('check');
              }}
            />
            <span className="label__icon">
              <span className="label__check">
                <ImCheckmark2 className="icon" />
              </span>
            </span>
            <span className="text">
              <Link href="privacy/terms">이용약관</Link> 및{' '}
              <Link href="privacy/terms">개인정보 취급방침</Link>에 동의합니다. (필수)
            </span>
          </label>
        </div>
      </div>
      <button
        type={isValid ? 'submit' : 'button'}
        className={`submit ${isValid && 'possible'}`}
        disabled={isLoading}
      >
        <span>회원가입</span>
      </button>
      <ul className="login_util">
        <Link className="util_btn" href="/auth/join">
          아이디 찾기
        </Link>
        <Link className="util_btn" href="/auth/reset">
          비밀번호 찾기
        </Link>
        <Link className="util_btn" href="/auth/login">
          로그인
        </Link>
      </ul>
    </form>
  );
};

export default create;
