
import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { getSupplierByName } from "../services/SupplierService";
import { productsList } from "../services/ProductService";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    color: "blue",
  },
  text: {
    fontSize: 13,
    wordSpacing: "5px",
  },
  bold: {
    fontWeight: "bold",
  },
  spacing: {
    marginBottom: 30,
  },
  underLine: {
    textDecoration: "underline",
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    lineHeight: 1.3,
  },
  flexContainer2: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deliverTo: {
    fontSize: 20,
    color: "red",
  },
  table: {
    margin: 20,
    width: '100%',
    borderCollapse: 'collapse', 
    minHeight: "900px",
    border: 1
  },
  tableRow: {
    flexDirection: 'row',
    minHeight: 30, 
  },
  headerCell: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    padding: 5,
    border: '1px solid #000', 
  },
  tableCellId: {
    flex: 0.5,
    textAlign: 'center',
    padding: 5,
    border: '1px solid #000', 
  },
  descriptionCell: {
    flex: 3,
    textAlign: 'left',
    padding: 5,
    border: '1px solid #000', 
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    padding: 5,
    border: '1px solid #000',
  },
  tableCellLast: {
    flex: 1,
    textAlign: 'right',
    padding: 5,
    border: '1px solid #000', 
    marginLeft: "20px",
    height: "30px"
  },
});

const Pdf = ({ order }) => {
  const company = JSON.parse(localStorage.getItem("company"));
  const [supplier, setSupplier] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (order?.supplier) {
      getSupplierByName(order.supplier.trim())
        .then((response) => {
          setSupplier(response?.data);
        })
        .catch((error) => {
          console.error("Error fetching supplier:", error);
        });
    }
    productsList().then((response) => {
      setProducts(response.data);
    });
  }, [order]);

  return (
    <Document>
      <Page size={[1200, 1300]} style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{company?.name}</Text>
          <Text style={styles.text}>{company?.address}</Text>
          <Text style={styles.text}>{company?.contact}</Text>
          <View style={styles.spacing} />
          <View style={styles.flexContainer}>
            <View>
              <Text style={styles.text}>Purchase From</Text>
              <Text style={styles.bold}>{order?.supplier}</Text>
              <Text style={[styles.text, styles.underLine]}>
                {supplier?.address}
              </Text>
              <Text style={styles.bold}>Attention to: {supplier?.contact}</Text>
            </View>

            <View>
              <Text style={styles.deliverTo}>Purchase Order</Text>
              <View style={styles.flexContainer2}>
                <View style={styles.flexContainer}>
                  <View>
                    <Text style={styles.text}>P.O No# </Text>
                  </View>{" "}
                  <View>
                    <Text style={styles.text}>{order?.po}</Text>{" "}
                  </View>
                </View>
                <View style={styles.flexContainer}>
                  <View>
                    <Text style={styles.text}>Date </Text>
                  </View>{" "}
                  <View>
                    <Text style={styles.text}>{order?.date}</Text>{" "}
                  </View>
                </View>
                <View style={styles.flexContainer}>
                  <View>
                    <Text style={styles.text}>Credit Terms </Text>
                  </View>{" "}
                  <View>
                    <Text style={styles.text}>Check</Text>{" "}
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Table-like Structure */}
      <View style={styles.table}>
            {/* Header Row */}
          <View style={styles.tableRow}>
          <Text style={styles.tableCellId}>#</Text>
          <Text style={styles.descriptionCell}>Description</Text>
          <Text style={styles.tableCell}>Quantity</Text>
          <Text style={styles.tableCell}>Unit Price</Text>
          <Text style={styles.tableCell}>Total Price</Text>
        </View>
        {order?.productNames?.map((item, index) => {
          const itemData = item.split(":");
          return (
            <View style={styles.tableRow} key={item}>
              <Text style={styles.tableCellId}>{index + 1}</Text>
              <Text style={styles.descriptionCell}>{itemData[0] || ''}</Text>
              <Text style={styles.tableCell}>{itemData[2] || ''}</Text>
              <Text style={styles.tableCell}>{itemData[1] || ''}</Text>
              <Text style={styles.tableCell}>{itemData[3] || ''}</Text>
              
            </View>
          );
        })}
        <Text style={{height: "30px", marginTop: "800px", marginLeft: 'auto', paddingRight: "10px",  border: '1px solid #000'}}>Total Amount: {order?.totalAmount}</Text>
      </View>
          
        </View>
      </Page>
    </Document>
  );
};

export default Pdf;
