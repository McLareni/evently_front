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

export const PDF = ({ event }: { event: Event }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {event && (
        <View style={styles.section}>
          <Image
            style={{ width: 200, height: 200 }}
            src={event.images[0]?.url || '/images/event-placeholder.jpg'}
          />
          <Text style={styles.text}>Назва: {event.title}</Text>
          <Text style={styles.text}>Ціна: {event.price} грн</Text>
          <Text style={styles.text}>
            Коли: {formatDateToDayMonth(event.date.day)} {event.date.time}
          </Text>
          <Text style={styles.text}>
            Де: {event.location.city}, {event.location.street}
          </Text>
        </View>
      )}
    </Page>
  </Document>
);
