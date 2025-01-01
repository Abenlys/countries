import React from "react";
import Image from "next/image";
import Link from "next/link";
import { contactList } from "./ContactList";
import "../styles/Contact.css";

export default function Contact() {
  return (
    <div className="contact">
      {contactList.map((contact, index) => (
        <div className="contact__item" key={index}>
          {contact.href ? (
            <Link href={contact.href}>
              <Image
                src={contact.icon}
                alt={contact.alt}
                width={50}
                height={50}
              />
            </Link>
          ) : (
            <Image
              src={contact.icon}
              alt={contact.alt}
              width={50}
              height={50}
            />
          )}
          <p>{contact.description}</p>
        </div>
      ))}
    </div>
  );
}
