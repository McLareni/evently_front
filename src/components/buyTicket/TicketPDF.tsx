import { formatDateToDayMonth } from '@/helpers/filters/formatDateToDayMonth';
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Roboto',
  },
});

export const PDF = ({ ticket }: { ticket: Ticket }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {ticket && (
        <View style={styles.section}>
          <Text style={styles.text}>
            Номер замовлення: {ticket.orderReference}
          </Text>
          <Image
            style={{ width: 200, height: 200 }}
            src={ticket.event.images[0]?.url || '/images/event-placeholder.jpg'}
          />
          <Text style={styles.text}>Назва: {ticket.event.title}</Text>
          <Text style={styles.text}>Ціна: {ticket.event.price} грн</Text>
          <Text style={styles.text}>
            Коли: {formatDateToDayMonth(ticket.event.date.day)},
            {ticket.event.date.time}
          </Text>
          <Text style={styles.text}>
            Де: {ticket.event.location.city}, {ticket.event.location.street}
          </Text>
          <Text style={styles.text}>
            Кількість квитків: {ticket.productCount} шт.
          </Text>
        </View>
      )}
    </Page>
  </Document>
);
