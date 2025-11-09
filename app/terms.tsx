import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TermsScreen() {
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
          <Text style={[styles.title, { color: colors.text }]}>Terms of Service</Text>
          <Text style={[styles.date, { color: colors.textSecondary }]}>Last updated: November 9, 2024</Text>
          
          <Text style={[styles.heading, { color: colors.text }]}>1. Acceptance of Terms</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            By accessing and using the Infoland mobile application ("App"), a news platform that provides news content, you accept and agree to be bound by the terms and provision of this agreement.
          </Text>

          <Text style={[styles.heading, { color: colors.text }]}>2. Use License</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Permission is granted to use the App for personal, non-commercial news reading purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
          </Text>
          <Text style={[styles.bullet, { color: colors.text }]}>
            • Modify or copy the materials{'\n'}
            • Use the materials for any commercial purpose or for any public display{'\n'}
            • Attempt to decompile or reverse engineer any software contained in the App{'\n'}
            • Remove any copyright or other proprietary notations from the materials
          </Text>

          <Text style={[styles.heading, { color: colors.text }]}>3. News Content</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Infoland aggregates and displays news content from publicly available sources. The news articles and content displayed in the App are provided for informational purposes only.
          </Text>

          <Text style={[styles.heading, { color: colors.text }]}>4. Disclaimer</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            The materials on the App are provided on an 'as is' basis. Infoland makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </Text>

          <Text style={[styles.heading, { color: colors.text }]}>5. Limitations</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            In no event shall Infoland or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the App and the materials on the App, even if Infoland or an authorized representative has been notified orally or in writing of the possibility of such damage.
          </Text>

          <Text style={[styles.heading, { color: colors.text }]}>6. Accuracy of Materials</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            The news content appearing in the App is sourced from third-party providers. Infoland does not warrant that any of the materials on its App are accurate, complete, or current. Infoland may make changes to the App at any time without notice.
          </Text>

          <Text style={[styles.heading, { color: colors.text }]}>7. Links</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            The App may contain links to external news sources and websites. Infoland has not reviewed all of the sites linked to the App and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Infoland of the site. Use of any such linked website is at the user's own risk.
          </Text>

          <Text style={[styles.heading, { color: colors.text }]}>8. Modifications</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            Infoland may revise these terms of service for its App at any time without notice. By using this App you are agreeing to be bound by the then current version of these terms of service.
          </Text>

          <Text style={[styles.heading, { color: colors.text }]}>9. Governing Law</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </Text>

          <Text style={[styles.contact, { color: colors.textSecondary }]}>
            If you have any questions about these Terms of Service, please contact us.
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

