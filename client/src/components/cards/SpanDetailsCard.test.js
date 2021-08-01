import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpanDetailsCard from './SpanDetailsCard';

describe('Span Details Card component', () => {
  test('displays span details information', () => {
    const span = {
      "span_id": "24b1a5a42d8e85bd",
      "session_id": "7ff82864-bd5b-4bcc-8699-53d773b7479d",
      "time_sent": 1627833994314485,
      "chapter_id": "d5bb6090-a764-4a63-9c26-c4918517f6b4",
      "data": {
        "http.request_content_length_uncompressed": "15",
        "http.status_text": "OK",
        "service.name": "your-service-name",
        "http.host": "localhost:5000",
        "frontendUser": "11a20a0a-f4c2-46f3-a5e7-dbe5cdb0ac23",
        "triggerRoute": "put /api/products/60c6d08a403cd5001c5563be",
        "net.peer.ip": "::ffff:127.0.0.1",
        "telemetry.sdk.language": "nodejs",
        "telemetry.sdk.version": "0.21.0",
        "http.method": "PUT",
        "http.route": "/api/products/60c6d08a403cd5001c5563be",
        "net.host.ip": "::ffff:127.0.0.1",
        "net.peer.port": "50134",
        "http.url": "http://localhost:5000/api/products/60c6d08a403cd5001c5563be",
        "net.host.name": "localhost",
        "http.user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
        "ot.status_code": "OK",
        "http.client_ip": "127.0.0.1",
        "http.flavor": "1.1",
        "http.status_code": "200",
        "http.target": "/api/products/60c6d08a403cd5001c5563be",
        "net.transport": "IP.TCP",
        "frontendChapter": "d5bb6090-a764-4a63-9c26-c4918517f6b4",
        "net.host.port": "5000",
        "telemetry.sdk.name": "opentelemetry",
        "frontendSession": "7ff82864-bd5b-4bcc-8699-53d773b7479d"
      },
      "request_data": "eyJxdWFudGl0eSI6NDh9",
      "status_code": 200,
      "time_duration": "80ms304us",
      "trace_id": "3ee60e6f996601148c8a9256ccdaa3b2",
      "trigger_route": "put /api/products/60c6d08a403cd5001c5563be",
      "user_id": "11a20a0a-f4c2-46f3-a5e7-dbe5cdb0ac23"
    };

    const setShow = jest.fn();

    render(
      <SpanDetailsCard span={span} setShow={setShow} />
    )

    expect(screen.getByText('X')).toBeInTheDocument();
    expect(screen.getByText(/Span Details/)).toBeInTheDocument();
    expect(screen.getAllByText('24b1a5a42d8e85bd')[0]).toBeInTheDocument();
    expect(screen.getByText(/span id/)).toBeInTheDocument();
    expect(screen.getAllByText('24b1a5a42d8e85bd')[1]).toBeInTheDocument();
    expect(screen.getByText(/trace id/)).toBeInTheDocument();
    expect(screen.getByText('3ee60e6f996601148c8a9256ccdaa3b2')).toBeInTheDocument();
    expect(screen.getByText(/chapter id/)).toBeInTheDocument();
    expect(screen.getAllByText('d5bb6090-a764-4a63-9c26-c4918517f6b4')[0]).toBeInTheDocument();
    expect(screen.getByText('Span Tags')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/session id/)).toBeInTheDocument();
    expect(screen.getByText('Span Tags')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
})