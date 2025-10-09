import React from 'react';

import { formatDateToDayMonth } from '@/helpers/filters/formatDateToDayMonth';
import {
  Document,
  Font,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

// Реєстрація шрифту з підтримкою кирилиці
Font.register({
  family: 'DejaVuSans',
  src: 'https://cdn.jsdelivr.net/npm/dejavu-fonts-ttf@2.37/ttf/DejaVuSans.ttf',
});

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 'bold',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 40,
    fontFamily: 'DejaVuSans',
  },
  header: {
    backgroundColor: '#004aad',
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  body: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  details: {
    flex: 1,
    fontSize: 16,
    lineHeight: 1.6,
    fontFamily: 'Roboto',
  },
  footer: {
    textAlign: 'center',
    backgroundColor: '#eee',
    fontSize: 20,
    padding: 20,
    borderRadius: 10,
  },
  link: {
    color: '#004aad',
    textDecoration: 'none',
  },
});

type Ticket = {
  ticketReference: string;
  title: string;
  price: string;
  date: { day: string; time: string; endTime?: string };
  eventFormat: 'ONLINE' | 'OFFLINE';
  eventUrl: string;
  location: { city: string; street: string; venue?: string };
  images: Image[];
};

interface PDFTicketProps {
  ticket: Ticket;
}

export const PDF: React.FC<PDFTicketProps> = ({ ticket }) => {
  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.slice(0, maxLength - 3) + '...' : text;

  console.log(ticket);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Квиток на подію</Text>

        <View style={styles.body}>
          <Image
            style={styles.image}
            src={
              ticket.images[0]?.url.replace('http://', 'https://') ||
              'https://via.placeholder.com/250'
            }
          />
          <View style={styles.details}>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Номер замовлення: </Text>
              <Text>{ticket.ticketReference}</Text>
            </Text>

            <Text>
              <Text style={{ fontWeight: 'bold' }}>Назва події: </Text>
              <Text>{ticket.title}</Text>
            </Text>

            <Text>
              <Text style={{ fontWeight: 'bold' }}>Ціна: </Text>
              <Text>{ticket.price} грн</Text>
            </Text>

            <Text>
              <Text style={{ fontWeight: 'bold' }}>Коли: </Text>
              <Text>
                {formatDateToDayMonth(ticket.date.day)}, {ticket.date.time}
                {ticket.date.endTime ? ` - ${ticket.date.endTime}` : ''}
              </Text>
            </Text>

            {ticket.eventFormat === 'OFFLINE' && (
              <Text>
                <Text style={{ fontWeight: 'bold' }}>Де: </Text>
                <Text>
                  {ticket.location.city}, {ticket.location.street}
                </Text>
              </Text>
            )}

            {ticket.eventFormat === 'ONLINE' && (
              <Text>
                <Text style={{ fontWeight: 'bold' }}>Посилання: </Text>
                <Link
                  src={ticket.eventUrl} // Натискання веде на повний URL
                  style={{ color: '#004aad', textDecoration: 'underline' }}
                >
                  {truncateText(ticket.eventUrl, 50)}{' '}
                  {/* Тільки для відображення */}
                </Link>
              </Text>
            )}
          </View>
        </View>

        <Text style={styles.footer}>Дякуємо за покупку!</Text>
      </Page>
    </Document>
  );
};
