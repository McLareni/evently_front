import {
  Document,
  Font,
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
          <Text style={styles.text}>Назва: {event.title}</Text>
          <Text style={styles.text}>Ціна: {event.price}</Text>
        </View>
      )}
    </Page>
  </Document>
);
