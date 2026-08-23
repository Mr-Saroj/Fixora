import React from 'react';
import { SectionCard, TitleInput, MessageTextarea, SendButton } from './SharedUI';

const BroadcastForm = ({
  title, setTitle,
  message, setMessage,
  loading, onSubmit,
}) => (
  <SectionCard icon="campaign" title="Broadcast to Everyone" badge="ALL USERS">
    <div className="space-y-3">
      <p className="text-xs text-slate-400 leading-relaxed">
        This message will be delivered to every customer and technician on the platform.
      </p>
      <TitleInput
        value={title}
        onChange={setTitle}
        placeholder="Title — e.g. 'Scheduled Maintenance'"
      />
      <MessageTextarea
        value={message}
        onChange={setMessage}
        placeholder="Write your announcement here…"
      />
      <div className="flex justify-end">
        <SendButton
          onClick={onSubmit}
          loading={loading}
          disabled={!title.trim() || !message.trim()}
          label="Send to All Users"
          icon="campaign"
        />
      </div>
    </div>
  </SectionCard>
);

export default BroadcastForm;