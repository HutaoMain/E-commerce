import { useContext } from "react";
import Footer from "../../components/footer/Footer";
import OrderItem from "../../components/orders/OrderItem";
import { AuthContext } from "../../contextAPI/AuthContext";
import useFetch from "../../contextAPI/useFetch";
import { UrlPath } from "../../UrlPath";
import "./ToPay.css";

const ToPay = () => {
  const { user } = useContext(AuthContext);
  const { data } = useFetch(`${UrlPath}/api/user/${user.email}`);

  const orders = data.order;
  const pending = orders?.filter((data) => data.status === "Pending");

  return (
    <div>
      {pending?.map((item) => (
        <OrderItem item={item} key={item.id} />
      ))}
      <Footer />
    </div>
  );
};

export default ToPay;
