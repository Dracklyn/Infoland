import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { NotificationCategory } from '@/hooks/use-theme-preference';

interface CategoryDropdownProps {
  selectedCategories: NotificationCategory[];
  onSelectionChange: (categories: NotificationCategory[]) => void;
  options: NotificationCategory[];
}

export function CategoryDropdown({ selectedCategories, onSelectionChange, options }: CategoryDropdownProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategory = (category: NotificationCategory) => {
    if (selectedCategories.includes(category)) {
      onSelectionChange(selectedCategories.filter(c => c !== category));
    } else {
      onSelectionChange([...selectedCategories, category]);
    }
  };

  const getDisplayText = () => {
    if (selectedCategories.length === 0) {
      return 'Select categories...';
    }
    if (selectedCategories.length === options.length) {
      return 'All categories';
    }
    if (selectedCategories.length === 1) {
      return selectedCategories[0];
    }
    return `${selectedCategories.length} categories selected`;
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.dropdown,
          {
            backgroundColor: colors.cardBody,
            borderColor: colors.textSecondary + '30',
          }
        ]}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.7}>
        <Text
          style={[
            styles.dropdownText,
            {
              color: selectedCategories.length === 0 ? colors.textSecondary : colors.text,
            }
          ]}>
          {getDisplayText()}
        </Text>
        <MaterialIcons
          name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color={colors.textSecondary}
        />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: colors.cardBody,
              }
            ]}
            onStartShouldSetResponder={() => true}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Select Categories
              </Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <MaterialIcons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.optionsList}>
              {options.map((option) => {
                const isSelected = selectedCategories.includes(option);
                return (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionItem,
                      isSelected && {
                        backgroundColor: colors.tint + '15',
                      }
                    ]}
                    onPress={() => toggleCategory(option)}
                    activeOpacity={0.7}>
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color: isSelected ? colors.tint : colors.text,
                          fontWeight: isSelected ? '600' : '400',
                        }
                      ]}>
                      {option}
                    </Text>
                    {isSelected && (
                      <View style={[styles.optionCheckmark, { backgroundColor: colors.tint }]}>
                        <MaterialIcons name="check" size={16} color="#FFFFFF" />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={[styles.doneButton, { backgroundColor: colors.tint }]}
              onPress={() => setIsOpen(false)}
              activeOpacity={0.8}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 44,
  },
  dropdownText: {
    fontSize: 16,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  optionsList: {
    gap: 8,
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
  },
  optionText: {
    fontSize: 16,
  },
  optionCheckmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

