export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'schoolIsLive',
      title: 'BBQ School is Live',
      description: 'Master switch. When OFF, BBQ School must not be purchasable or accessible to anyone, even if individual lessons are marked published. Keep this off while building.',
      type: 'boolean',
      initialValue: false,
    },
  ],
}
