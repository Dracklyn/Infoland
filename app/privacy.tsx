import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function PrivacyScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Math.max(insets.top + 16, 28) }
        ]}
        showsVerticalScrollIndicator={false}>
        
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>Privacy Policy</Text>
          <Text style={[styles.date, { color: colors.textSecondary }]}>Last updated: November 9, 2024</Text>
          
          <Text style={[styles.heading, { color: colors.text }]}>1. Introduction</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Infoland is a news platform that provides news content to users. We are committed to protecting your privacy and want to be transparent about our data practices.
          </Text>

          <Text style={[styles.heading, { color: colors.text }]}>2. Information We Collect</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Infoland is a news reading application. We do not collect, store, or process any personal user data. The app functions as a news aggregator that displays publicly available news content.
          </Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            The only data stored locally on your device includes:
          </Text>
          <Text style={[styles.bullet, { color: colors.text }]}>
            • App preferences (theme settings, notification preferences){'\n'}
            • Reading preferences (selected news categories){'\n'}
            • All data is stored locally on your device and is never transmitted to our servers
          </Text>

          <Text style={[styles.heading, { color: colors.text }]}>3. How We Use Your Information</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Since we do not collect personal information, there is no user data to use, share, or sell. All preferences are stored locally on your device and are used solely to enhance your reading experience within the app.
          </Text>

          <Text style={[styles.heading, { color: colors.text }]}>4. Third-Party Services</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            The app fetches news content from publicly available sources. We do not share any user information with third parties because we do not collect any user information.
          </Text>

          <Text style={[styles.heading, { color: colors.text }]}>5. Data Security</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Since all data is stored locally on your device, you have full control over your information. You can clear app data at any time through your device settings.
          </Text>

          <Text style={[styles.heading, { color: colors.text }]}>6. Children's Privacy</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Our app does not knowingly collect information from children under 13. Since we do not collect any user data, there is no risk of collecting information from children.
          </Text>

          <Text style={[styles.heading, { color: colors.text }]}>7. Changes to This Privacy Policy</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </Text>

          <Text style={[styles.contact, { color: colors.textSecondary }]}>
            If you have questions or comments about this Privacy Policy, please contact us.
          </Text>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  content: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    marginBottom: 24,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    paddingLeft: 8,
  },
  contact: {
    fontSize: 14,
    marginTop: 32,
    fontStyle: 'italic',
  },
});

