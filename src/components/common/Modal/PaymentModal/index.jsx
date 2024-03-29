import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';
import PaymentModalContainer from './style';

export default function PaymentModal({ toggleIsPayment }) {
  return (
    <PaymentModalContainer>
      <div
        role="presentation"
        className="back"
        onClick={toggleIsPayment}
        onKeyDown={toggleIsPayment}
      />
      <div className="content_box">
        <div className="order_info">
          <div className="order_content">
            <div className="order_phone_box">
              <h2>계좌번호</h2>
              <p>입력하시면 문자로 계좌번호가 전송됩니다.</p>
              <input type="tel" pattern="[0-9]{3}[0-9]{4}[0-9]{4}" placeholder="ex) 01012345678" />
            </div>

            <div className="account_number_box">
              <p>농협(전동찬) 352-1400-1028-63</p>
              <CopyToClipboard
                text="농협 352-1400-1028-63"
                onCopy={() => toast.success('클립보드에 복사되었습니다.')}
              >
                <button type="button">복사</button>
              </CopyToClipboard>
            </div>
          </div>
          <button type="button" className="C_basic_button">
            문자전송
          </button>
        </div>
      </div>
    </PaymentModalContainer>
  );
}
