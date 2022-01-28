export interface Email {
    sent: string,
    from: string,
    to: string,
    from_email: string,
    to_emails: string[],
    subject: string,
    trove: string,
    key: string,
    body: string,
    body_html: boolean
}
  